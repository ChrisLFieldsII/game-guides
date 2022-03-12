type DDBUpdateExpressionMap = {
  UpdateExpression: string
  ExpressionAttributeNames: Record<string, string>
  ExpressionAttributeValues: Record<string, string>
}

type DDBHashObject = {
  pk: string
  sk: string
  id: string
  createdAt: string
  updatedAt: string
}

enum GSI {
  ID_AS_PK = 'id-as-pk',
  FLIP_PK_SK = 'flip-pk-sk',
}

/**
 * Reps media attached to an item (photos, videos)
 */
type DDBMedia = DDBHashObject & {
  bucket: string
  key: string
  itemId: string
  readonly type: 'MEDIA'
}

/**
 * Reps a game that a user can create/get guides for
 */
type DDBGame = DDBHashObject & {
  name: string
  description: string
  readonly type: 'GAME'
}

/**
 * Reps a guide created by a user that others can add to their
 * collection
 */
type DDBGuide = DDBHashObject & {
  name: string
  gameId: string
  createdById: string
  readonly type: 'GUIDE'
}

/**
 * Reps a guide section that is within a guide
 */
type DDBGuideSection = DDBHashObject & {
  name: string
  description: string
  guideId: string
  readonly type: 'GUIDE_SECTION'
}

/**
 * Reps a guide item that is within a guide section
 */
type DDBGuideItem = DDBHashObject & {
  name: string
  description: string
  sectionId: string
  readonly type: 'GUIDE_ITEM'
}

/**
 * Reps a guide that a user added to their account
 */
type DDBAccountGuide = DDBHashObject & {
  accountId: string
  guideId: string
  gameId: string
  readonly type: 'ACCOUNT_GUIDE'
}

/**
 * Reps a users guide item and its completion status
 */
type DDBAccountGuideItem = DDBHashObject & {
  accountId: string
  itemId: string
  isComplete: boolean
  readonly type: 'ACCOUNT_GUIDE_ITEM'
}
