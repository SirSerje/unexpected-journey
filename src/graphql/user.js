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
        removeUser(id: ID!): User
    }
`;

const resolvers = {
  Query: {
    getUsers: async () => {
      return await User.find({}).exec();
    }
  },
  Mutation: {
    removeUser: async (_, args) => {
      try {
        let response = await User.find( { _id: args.id } );
        //TODO: really delete element
        return response[0];
      } catch(e) {
        return e.message;
      }
    },
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
