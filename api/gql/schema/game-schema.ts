import { gql } from 'apollo-server-micro'

export const gameSchema = gql`
  type Game {
    id: ID!
    name: String!
    description: String!
    media: Media!
    createdAt: DateTime!
    updatedAt: DateTime!
  }
`
