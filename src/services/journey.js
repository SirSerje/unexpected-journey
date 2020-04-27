import Character from '../models/character';
import Journey from '../models/journey';
import User from '../models/user';


const journeyService = {
  async updateJourney(journeyId, params) {
    const {description} = params;

    return Journey.update({ _id: journeyId }, { description: description });
  },
  async removeJourney(params) {
    const { journeyId, userId } = params;
    await Journey.deleteOne({ _id: journeyId });

    return await User.update({ _id: userId }, { $pullAll: { journeys: [journeyId] } }, { new: true });
  },
  async createAndAssign(params) {
    const { userId, description } = params;

    const currentUser = await User.findById(userId);

    const newJourney = await Journey.create({
      description,
      owner: currentUser._id,
    });

    await User.findOneAndUpdate(
      { _id: currentUser._id },
      { $push: { journeys: newJourney._id } },
      { new: true });

    return newJourney._id;

  },
  async getUserJourney(userId) {
    const currentUser = await User.findById(userId).populate('journeys');

    return currentUser.journeys;
  },
};
export default journeyService;
