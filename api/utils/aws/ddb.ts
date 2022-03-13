import {
  QueryCommand,
  QueryCommandOutput,
  QueryCommandInput,
  BatchGetCommand,
  UpdateCommand,
  PutCommand,
} from '@aws-sdk/lib-dynamodb'

import { GSI } from '~/types'

import { connectionMapper } from '../mappers'
import { ddbClient } from './clients'
import { TableName } from './constants'

type GetItemByIdParams<From, To> = {
  id: string
  mapper: Mapper<From, To>
}

async function getItemById<From, To>({
  id,
  mapper,
}: GetItemByIdParams<From, To>): Promise<Nullable<To>> {
  const queryCmd = new QueryCommand({
    TableName,
    IndexName: GSI.ID_AS_PK,
    KeyConditionExpression: '#id = :id',
    ExpressionAttributeNames: {
      '#id': 'id',
    },
    ExpressionAttributeValues: {
      ':id': id,
    },
  })

  const res = await ddbClient.send(queryCmd)
  const item = res.Items?.[0] as From | undefined

  if (!item) {
    return null
  }

  return mapper(item)
}

function updateExpressionBuilder(updateObj: any): DDBUpdateExpressionMap {
  const map: DDBUpdateExpressionMap = {
    UpdateExpression: '',
    ExpressionAttributeNames: {},
    ExpressionAttributeValues: {},
  }

  function addToUpdateExpression(expression: string) {
    if (map.UpdateExpression) {
      map.UpdateExpression += `, ${expression}`
    } else {
      map.UpdateExpression = `SET ${expression}`
    }
  }

  function addToExpressionAttributes(column: string, value: any) {
    map.ExpressionAttributeNames[`#${column}`] = column
    map.ExpressionAttributeValues[`:${column}`] = value
  }

  for (let column in updateObj) {
    const attrKey = `#${column}`
    const valueKey = `:${column}`

    addToUpdateExpression(`${attrKey} = ${valueKey}`)
    addToExpressionAttributes(column, updateObj[column])
  }

  return map
}

type UpdateItemByIdParams<From extends Record<string, any>, To> = {
  updateParams: Record<string, any>
  getKey: (item: From) => Record<string, any>
  mapper: Mapper<From, To>
}

async function updateItemById<From extends Record<string, any>, To>(
  input: UpdateItemByIdParams<From, To>,
) {
  const { getKey, updateParams, mapper } = input
  const { id } = updateParams

  const newUpdateParams = {
    ...updateParams,
    updatedAt: new Date().toISOString(),
  }

  const item = await getItemById<From, From>({ id, mapper: (from) => from })

  if (!item) {
    throw new Error('Item doesnt exist')
  }

  const {
    UpdateExpression,
    ExpressionAttributeNames,
    ExpressionAttributeValues,
  } = updateExpressionBuilder(newUpdateParams)

  const updateCmd = new UpdateCommand({
    TableName,
    Key: getKey(item),
    UpdateExpression,
    ExpressionAttributeNames,
    ExpressionAttributeValues,
  })

  await ddbClient.send(updateCmd)

  const mappedItem = await getItemById({ id, mapper })

  return mappedItem!
}

/**
 * Convert DDB hash object into opaque cursor string representing object
 */
function toCursorHash(hash: DDBHashObject) {
  return Buffer.from(JSON.stringify(hash)).toString('base64')
}

/**
 * Convert opaque cursor string into DDB hash object
 */
function fromCursorHash(value?: Nullable<string>): DDBHashObject | undefined {
  if (!value) {
    return undefined
  }

  return JSON.parse(
    Buffer.from(value, 'base64').toString('ascii'),
  ) as DDBHashObject
}

async function getConnection<Input extends DDBHashObject, Output>({
  items: inputItems = [],
  opts,
  mapper,
}: GetConnectionCmd<Input, Output>) {
  const cursors = inputItems.map((item) =>
    toCursorHash({ pk: item.pk, sk: item.sk }),
  )

  const outputItems = await Promise.all(inputItems.map(mapper))

  const connection = connectionMapper(outputItems, cursors, opts)

  return connection
}

type CreateItemParams<From, To> = {
  item: From
  mapper: Mapper<From, To>
}

async function createItem<From, To>({
  item: Item,
  mapper,
}: CreateItemParams<From, To>) {
  const putCmd = new PutCommand({
    Item,
    TableName,
  })

  await ddbClient.send(putCmd)

  return mapper(Item)
}

export const ddbUtils = {
  getItemById,
  updateExpressionBuilder,
  updateItemById,
  toCursorHash,
  fromCursorHash,
  getConnection,
  createItem,
}
