import {
  QueryCommand,
  QueryCommandOutput,
  QueryCommandInput,
  BatchGetCommand,
  UpdateCommand,
} from '@aws-sdk/lib-dynamodb'

import { ddbClient } from './clients'
import { TableName } from './constants'

async function getItemById<T>(cmd: GetItemInput): Promise<Nullable<T>> {
  const { id } = cmd

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
  const item = res.Items?.[0] as T | undefined

  if (!item) {
    return null
  }

  return item
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

type UpdateItemByIdParams<T> = {
  updateParams: Record<string, any>
  getKey: (item: T) => Record<string, any>
}

async function updateItemById<T>(input: UpdateItemByIdParams<T>) {
  const { getKey, updateParams } = input
  const { id } = updateParams

  const newUpdateParams = {
    ...updateParams,
    updatedAt: new Date().toISOString(),
  }

  let item = await getItemById<T>({ id })

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

  item = await getItemById<T>({ id })

  return item!
}

export const ddbUtils = { getItemById, updateExpressionBuilder, updateItemById }
