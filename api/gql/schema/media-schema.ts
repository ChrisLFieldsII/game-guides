import { gql } from 'apollo-server-micro'

export const mediaSchema = gql`
  type Media {
    type: MediaType!
    url: URL
  }

  enum MediaType {
    IMAGE
    VIDEO
  }
`
