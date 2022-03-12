import { gql } from 'apollo-server-micro'

export const guideItemSchema = gql`
  type GuideItem {
    id: ID!
    name: String!
    media: [Media!]!
    isComplete: Boolean

    createdAt: DateTime!
    updatedAt: DateTime!
  }
`
