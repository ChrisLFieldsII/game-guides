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

  type GameEdge {
    node: Game!
    cursor: String!
  }

  type GameConnection {
    items: [Game!]!
    edges: [GameEdge!]!
    pageInfo: PageInfo!
  }

  input CreateGameInput {
    id: ID
    name: String!
    description: String!
  }

  input ListGamesInput {
    name: String!
    first: Int
    after: String
  }

  type Query {
    getGame(id: ID!): Game
    listGames(input: ListGamesInput!): GameConnection!
  }

  type Mutation {
    createGame(input: CreateGameInput!): Game!
  }
`
