import { DynamoDB, DynamoDBClientConfig } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'

import { region, accessKeyId, secretAccessKey } from './constants'

const credentials = {
  accessKeyId,
  secretAccessKey,
}

const config: DynamoDBClientConfig = {
  credentials,
  region,
}

export const ddbClient = DynamoDBDocument.from(new DynamoDB(config), {
  marshallOptions: {
    convertEmptyValues: true,
    removeUndefinedValues: true,
    convertClassInstanceToMap: true,
  },
})
