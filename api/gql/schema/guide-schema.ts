import { gql } from 'apollo-server-micro'

export const guideSchema = gql`
  type Guide {
    id: ID!
    name: String!
    sections: [GuideSection!]!
    isAddedToCollection: Boolean! # does user have guide in their collection
    gameId: ID!
    game: Game

    createdById: ID!
    createdBy: Account

    createdAt: DateTime!
    updatedAt: DateTime!
  }
`
