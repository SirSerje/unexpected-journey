import Character from '../models/character';
import User from '../models/user';


const characterService = {
  async updateCharacter(charId, params) {
    const {name} = params;

    return Character.findOneAndUpdate({ _id: charId }, { name: name });
  },
  async removeCharacter(params) {
    const { charId, userId } = params;

    const deletionResult = await Character.deleteOne({ _id: charId });
    await User.findOneAndUpdate({ _id: userId }, { $pullAll: { characters: [charId] } }, { new: true });

    return deletionResult.deletedCount > 0;
  },
  async createAndAssign(params) {
    const { userId, name, stats } = params;

    const currentUser = await User.findById(userId);
    const { characters } = await User.findById(userId).populate('characters');
    const isSame = characters.find(i => i.name === name);

    if (!isSame) {
      const newChar = await Character.create({
        name,
        stats,
        owner: currentUser._id,
      });

      await User.findOneAndUpdate(
        { _id: currentUser._id },
        { $push: { characters: newChar._id } },
        { new: true });
      
      return newChar._id;
    } else {
      console.log('character already present :(');
      
      return null;
    }
  },
  async getUserCharacters(userId) {
    const currentUser = await User.findById(userId).populate('characters');

    return currentUser.characters.map(({ _id, name, stats }) => ({ _id, name, stats }));
  },
};
export default characterService;
