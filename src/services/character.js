import Character from '../models/character';
import User from '../models/user';


const characterService = {
  async update(_id, params) {
    return Character.update({ _id }, { ...params });
  },
  async remove(userId, entityId, populate = 'characters') {
    await Character.deleteOne({ _id: entityId });

    return await User.updateOne({ _id: userId }, { $pullAll: { [populate]: [entityId] } }, { new: true });
  },
  async create(userId, params, populate = 'characters') {
    const { name, stats } = params;

    const currentUser = await User.findById(userId);
    const entity = await User.findById(userId).populate(populate);
    const isSame = entity[populate].find(i => i.name === name);

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
  async get(_id, populate = 'characters') {
    const currentUser = await User.findById(_id).populate(populate);

    return currentUser[populate];
  },
};

export default characterService;
