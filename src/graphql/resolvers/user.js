import User from '../../schemes/user'

const resolvers = {
  Query: {
    getUsers: async () => {
      return await User.find({}).exec()
    }
  },
  Mutation: {
    addUser: async (_, args) => {
      try {
        let response = await User.create(args)
        return response
      } catch(e) {
        return e.message
      }
    }
  }
}

export default resolvers
