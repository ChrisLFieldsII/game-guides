import { gql } from 'apollo-server-micro'

export const guideSectionSchema = gql`
  type GuideSection {
    id: ID!
    name: String!
    description: String!
    items: [GuideItem!]!
    order: Int!

    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Mutation {
    createGuideSection(input: CreateGuideSectionInput!): Guide!
  }

  input CreateGuideSectionInput {
    id: ID
    name: String!
    description: String!
    guideId: ID!
    order: Int!
  }
`
