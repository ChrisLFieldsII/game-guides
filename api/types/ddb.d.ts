type DDBUpdateExpressionMap = {
  UpdateExpression: string
  ExpressionAttributeNames: Record<string, string>
  ExpressionAttributeValues: Record<string, string>
}

type DDBHashObject = {
  pk: string
  sk: string
}

type DDBItem = DDBHashObject & {
  id: string
  createdAt: string
  updatedAt: string
  readonly type: string
}

/**
 * Reps media attached to an item (photos, videos)
 */
type DDBMedia = DDBItem & {
  bucket: string
  key: string
  itemId: string
}

/**
 * Reps a game that a user can create/get guides for
 */
type DDBGame = DDBItem & {
  name: string
  description: string
}

/**
 * Reps a guide created by a user that others can add to their
 * collection
 */
type DDBGuide = DDBItem & {
  description: string
  name: string
  gameId: string
  createdById: string
}

/**
 * Reps a guide section that is within a guide
 */
type DDBGuideSection = DDBItem & {
  name: string
  description: string
  guideId: string
}

/**
 * Reps a guide item that is within a guide section
 */
type DDBGuideItem = DDBItem & {
  name: string
  description: string
  sectionId: string
}

/**
 * Reps a guide that a user added to their account
 */
type DDBAccountGuide = DDBItem & {
  accountId: string
  guideId: string
  gameId: string
}

/**
 * Reps a users guide item and its completion status
 */
type DDBAccountGuideItem = DDBItem & {
  accountId: string
  itemId: string
  isComplete: boolean
}
