import { ApolloServer } from 'apollo-server-micro'
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'

import { typeDefs, resolvers } from '~/gql'

export const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageLocalDefault()],
})
