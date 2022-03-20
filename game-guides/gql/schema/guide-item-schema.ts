import { gql } from 'apollo-server-micro'

export const guideItemSchema = gql`
  type GuideItem {
    id: ID!
    name: String!
    description: String!
    media: [Media!]!
    order: Int!
    isComplete: Boolean # optional b/c a user may be viewing guide before adding it
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Mutation {
    createGuideItem(input: CreateGuideItemInput!): Guide!
  }

  input CreateGuideItemInput {
    id: ID
    guideSectionId: ID!
    guideId: ID!
    name: String!
    description: String!
    order: Int!
  }
`
