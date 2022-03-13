import { DateTimeResolver, URLResolver } from 'graphql-scalars'
import { accountService, gameService } from '~/services'
import {
  QueryResolvers,
  Resolvers,
  MutationResolvers,
  GameResolvers,
} from './types'

const Query: QueryResolvers = {
  // account
  getAccount: (root, args) => {
    return accountService.getAccount(args)
  },

  // game
  getGame: (root, args) => {
    return gameService.getGame(args)
  },
  listGames: (root, args) => {
    return gameService.listGames(args.input)
  },
}

const Mutation: MutationResolvers = {
  // account
  updateAccount: (root, args) => {
    return accountService.updateAccount(args.input)
  },

  // game
  createGame: (root, args) => {
    return gameService.createGame(args.input)
  },
}

const Scalars = {
  DateTime: DateTimeResolver,
  URL: URLResolver,
}

const Game: GameResolvers = {
  media: (root, args) => {
    // TODO: add media functionality
    return {
      type: 'IMAGE',
      url: 'https://play-lh.googleusercontent.com/HUuQc4Zpl6x7fUyX-jFMmcuUbW77REw4UKl5rfhHfP4VY6ctBU1w1I_RZWsXaojFgIo',
    }
  },
}

export const resolvers: Resolvers = {
  Query,
  Mutation,
  Game,
  ...Scalars,
}
