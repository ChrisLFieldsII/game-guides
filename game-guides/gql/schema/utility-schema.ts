import { gql } from 'apollo-server-micro'

export const utilitySchema = gql`
  type PageInfo {
    hasNextPage: Boolean!
    hasItems: Boolean!
    startCursor: String!
    endCursor: String!
    numItems: Int!
  }
`
