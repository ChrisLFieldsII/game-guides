import { DateTimeResolver, URLResolver } from 'graphql-scalars'
import { accountService, gameService } from '~/services'
import { QueryResolvers, Resolvers, MutationResolvers } from './types'

const Query: QueryResolvers = {
  getAccount: (root, args) => {
    return accountService.getAccount(args)
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

export const resolvers: Resolvers = {
  Query,
  Mutation,
  ...Scalars,
}
