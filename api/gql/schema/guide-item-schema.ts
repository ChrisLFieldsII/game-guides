import { gql } from 'apollo-server-micro'

export const guideItemSchema = gql`
  type GuideItem {
    id: ID!
    name: String!
    description: String!
    media: [Media!]!
    isComplete: Boolean # optional b/c a user may be viewing guide before adding it
    createdAt: DateTime!
    updatedAt: DateTime!
  }
`
