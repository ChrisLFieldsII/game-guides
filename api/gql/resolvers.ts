import { DateTimeResolver, URLResolver } from 'graphql-scalars'
import { accountService, gameService, guideService } from '~/services'
import {
  QueryResolvers,
  Resolvers,
  MutationResolvers,
  GameResolvers,
  GuideResolvers,
} from './types'

const Query: QueryResolvers = {
  // account
  getAccount: (parent, args) => {
    return accountService.getAccount(args)
  },

  // game
  getGame: (parent, args) => {
    return gameService.getGame(args)
  },
  listGames: (parent, args) => {
    return gameService.listGames(args.input)
  },
}

const Mutation: MutationResolvers = {
  // account
  updateAccount: (parent, args) => {
    return accountService.updateAccount(args.input)
  },

  // game
  createGame: (parent, args) => {
    return gameService.createGame(args.input)
  },

  // guide
  createGuide: (parent, args) => {
    return guideService.createGuide(args.input)
  },
}

const Scalars = {
  DateTime: DateTimeResolver,
  URL: URLResolver,
}

const Game: GameResolvers = {
  media: (parent, args) => {
    // TODO: add media functionality
    return {
      type: 'IMAGE',
      url: 'https://play-lh.googleusercontent.com/HUuQc4Zpl6x7fUyX-jFMmcuUbW77REw4UKl5rfhHfP4VY6ctBU1w1I_RZWsXaojFgIo',
    }
  },
}

const Guide: GuideResolvers = {
  createdBy: (parent) => {
    return accountService.getAccount({ id: parent.createdById })
  },
  game: (parent) => {
    return gameService.getGame({ id: parent.gameId })
  },
}

export const resolvers: Resolvers = {
  ...Scalars,
  Query,
  Mutation,
  Game,
  Guide,
}
