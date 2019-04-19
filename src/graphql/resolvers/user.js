import User from '../../schemes/user';
import Journey from '../../schemes/journey';

const resolvers = {
  Query: {
    getUsers: async () => {
      return await User.find({}).exec();
    },
    getJourney: async () => {
      return await Journey.find({}).exec();
    }
  },
  Mutation: {
    addJourney: async (_, args) => {
      try {
        let response = await Journey.create(args);
        return response;
      } catch(e) {
        return e.message;
      }
    },
    addUser: async (_, args) => {
      try {
        let response = await User.create(args);
        return response;
      } catch(e) {
        return e.message;
      }
    }
  }
};

export default resolvers;
