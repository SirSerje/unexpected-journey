import gql from 'graphql-tag';

const typeDefs = gql`
    type User {
        id: ID!
        password: ID
        username: String
        email: String
    }
    
    type Journey {
      id: ID!
      userId: String
      journey: String
      character: String
    }
    
    type Query {
        getUsers: [User]
        getJourney: [Journey]

    }
    type Mutation {
        addUser(username: String!, email: String!, password: String!): User
        addJourney(userId: String!, character: String!, journey: String!): Journey
    }
`;
export default typeDefs;