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
    createAccount(input: CreateAccountInput!): Account!
  }

  input CreateAccountInput {
    id: ID!
    name: String!
    email: String!
  }
`
