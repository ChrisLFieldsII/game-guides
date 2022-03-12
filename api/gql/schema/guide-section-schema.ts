import { gql } from 'apollo-server-micro'

export const guideSectionSchema = gql`
  type GuideSection {
    id: ID!
    name: String!
    items: [GuideItem!]!

    createdAt: DateTime!
    updatedAt: DateTime!
  }
`
