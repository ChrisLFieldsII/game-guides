import { DateTimeResolver, URLResolver } from 'graphql-scalars'
import { accountService } from '~/services'
import { QueryResolvers, Resolvers, MutationResolvers } from './types'

const Query: QueryResolvers = {
  getAccount: (root, args) => {
    return accountService.getAccount(args)
  },
}

const Mutation: MutationResolvers = {
  updateAccount: (root, args) => {
    return accountService.updateAccount(args.input)
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
