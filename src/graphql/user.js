import gql from 'graphql-tag';
import User from '../schemes/user';
import { makeExecutableSchema } from 'graphql-tools';

const typeDefs = gql`
    type User {
        id: ID!
        password: ID
        username: String
        email: String
    }
    
    type Query {
        getUsers: [User]
    }
    
    type Mutation {
        addUser(username: String!, email: String!, password: String!): User
    }
`;

const resolvers = {
  Query: {
    getUsers: async () => {
      return await User.find({}).exec();
    }
  },
  Mutation: {
    addUser: async (_, args) => {
      try {
        let response = await User.create(args);
        return response;
      } catch (e) {
        return e.message;
      }
    }
  }
};

const userSchema = makeExecutableSchema({typeDefs, resolvers});
export default userSchema;
