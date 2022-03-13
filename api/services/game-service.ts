import cuid from 'cuid'
import time from 'dayjs'
import {
  PutCommand,
  QueryCommand,
  QueryCommandInput,
  UpdateCommand,
  DeleteCommand,
  BatchGetCommand,
} from '@aws-sdk/lib-dynamodb'

import { ddbUtils, TableName, ddbClient, DEFAULT_LIMIT } from '~/utils'
import { DDBType } from '~/types'

interface IGameService {
  createGame: (input: CreateGameInput) => Promise<Game>
  getGame: (input: GetItemInput) => Promise<Nullable<Game>>
  listGames: (input: ListGamesInput) => Promise<Connection<Game>>
}

class GameService implements IGameService {
  private mapper: Mapper<DDBGame, Promise<Game>> = async (from) => {
    return {
      ...from,
      // the `Game` resolver handles getting media data
      media: {
        type: 'VIDEO',
        url: '',
      },
    }
  }

  private getKeys = ({ name }: { name: string }): DDBHashObject => {
    return {
      pk: `${DDBType.GAME}#${name.getFirst4Chars()}`,
      sk: name.normalizeGameName(),
    }
  }

  getGame = async (input: GetItemInput) => {
    const ddbGame = await ddbUtils.getItemById<DDBGame>(input)

    if (!ddbGame) {
      return null
    }

    return this.mapper(ddbGame)
  }

  createGame = async (input: CreateGameInput) => {
    const id = input.id || cuid()
    const { name, description } = input

    const now = time()

    const Item: DDBGame = {
      id,
      ...this.getKeys({ name }),
      name,
      description,
      type: DDBType.GAME,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    }

    const putCmd = new PutCommand({
      Item,
      TableName,
    })

    const res = await ddbClient.send(putCmd)

    return this.mapper(Item)
  }

  listGames = async ({
    name,
    after,
    first: limit = DEFAULT_LIMIT,
  }: ListGamesInput) => {
    const keys = this.getKeys({ name })

    const queryCmd = new QueryCommand({
      TableName,
      KeyConditionExpression: '#pk = :pk AND begins_with(#sk, :sk)',
      ExpressionAttributeValues: {
        ':pk': keys.pk,
        ':sk': keys.sk,
      },
      ExpressionAttributeNames: {
        '#pk': 'pk',
        '#sk': 'sk',
      },
      ExclusiveStartKey: ddbUtils.fromCursorHash(after || undefined),
      Limit: limit || DEFAULT_LIMIT,
    })

    const ddbRes = await ddbClient.send(queryCmd)

    const connection = await ddbUtils.getConnection<DDBGame, Game>({
      items: ddbRes.Items as DDBGame[] | undefined,
      mapper: this.mapper,
      opts: {
        hasNextPage: !!ddbRes.LastEvaluatedKey,
      },
    })

    return connection
  }
}

export const gameService = new GameService()
