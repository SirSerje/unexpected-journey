import Journey from '../models/journey';
import User from '../models/user';


const journeyService = {
  async update(_id, params) {
    return Journey.update({ _id }, { ...params });
  },
  async remove(_id, entityId) {
    await Journey.findByIdAndDelete(entityId);

    return await User.updateOne({ _id }, { $pullAll: { journeys: [entityId] } }, { new: true });
  },
  async create(userId, params) {
    const current = await User.findById(userId);
    const newEntity = await Journey.create({ ...params, owner: current._id });
    await User.findOneAndUpdate(
      { _id: current._id },
      { $push: { journeys: newEntity._id } },
      { new: true });

    return newEntity._id;
  },
  async get(_id, populate = 'journeys') {
    const currentUser = await User.findById(_id).populate(populate);

    return currentUser[populate];
  },
};

export default journeyService;
