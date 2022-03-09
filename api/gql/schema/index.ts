import { mergeTypeDefs } from '@graphql-tools/merge'
import { accountSchema } from './account-schema'

const typesArray = [accountSchema]
// const scalarsArray = []

export const typeDefs = mergeTypeDefs([...typesArray])
