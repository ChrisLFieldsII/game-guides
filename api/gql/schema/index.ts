import { mergeTypeDefs } from '@graphql-tools/merge'
import { DateTimeTypeDefinition } from 'graphql-scalars'

import { accountSchema } from './account-schema'
import { scalars } from './scalars'

const typesArray = [accountSchema, scalars]

const scalarsArray = [DateTimeTypeDefinition]

export const typeDefs = mergeTypeDefs([...typesArray, ...scalarsArray])
