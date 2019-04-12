import gql from 'graphql-tag'

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
`
export default typeDefs