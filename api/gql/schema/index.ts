import { mergeTypeDefs } from '@graphql-tools/merge'
import { DateTimeTypeDefinition, URLTypeDefinition } from 'graphql-scalars'

import { scalars } from './scalars'
import { accountSchema } from './account-schema'
import { guideSchema } from './guide-schema'
import { gameSchema } from './game-schema'
import { guideItemSchema } from './guide-item-schema'
import { guideSectionSchema } from './guide-section-schema'
import { mediaSchema } from './media-schema'
import { utilitySchema } from './utility-schema'

const typesArray = [
  scalars,
  accountSchema,
  guideSchema,
  guideItemSchema,
  guideSectionSchema,
  gameSchema,
  mediaSchema,
  utilitySchema,
]

const scalarsArray = [DateTimeTypeDefinition, URLTypeDefinition]

export const typeDefs = mergeTypeDefs([...typesArray, ...scalarsArray])
