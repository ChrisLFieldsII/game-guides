import { gql } from 'apollo-server-micro'

export const accountSchema = gql`
  type Account {
    id: ID!
    name: String!
    email: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    getAccount(id: ID!): Account
  }

  type Mutation {
    updateAccount(input: UpdateAccountInput!): Account!
  }

  input UpdateAccountInput {
    id: ID!
    name: String
    email: String
    createdAt: DateTime # next-auth auto creates users w/o createdAt timestamp so on creation of user, update timestamp
  }
`
