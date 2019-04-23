import gql from 'graphql-tag';
import { makeExecutableSchema } from 'graphql-tools';
import Journey from '../schemes/journey';

const typeDefs = gql`
    type Journey {
        id: ID!
        userId: String!
        journey: String!
        character: String!
    }
    
    type Query {
        getJourney: [Journey]
    }
    
    type Mutation {
        addJourney(userId: String!, character: String!, journey: String!): Journey
        removeJourney(id: ID!): Journey
    }
`;

const resolvers = {
  Query: {
    getJourney: async () => {
      return await Journey.find({}).exec();
    }
  },
  Mutation: {
    removeJourney: async (_, args) => {
      try {
        let response = await Journey.find( { _id: args.id } );
        //TODO: really delete element
        return response[0];
      } catch(e) {
        return e.message;
      }
    },
    addJourney: async (_, args) => {
      try {
        let response = await Journey.create(args);
        return response;
      } catch(e) {
        return e.message;
      }
    }
  }
};

const journeySchema = makeExecutableSchema({typeDefs, resolvers});
export default journeySchema;
