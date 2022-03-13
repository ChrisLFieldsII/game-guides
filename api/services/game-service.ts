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

import { ddbUtils, TableName, ddbClient } from '~/utils'
import { DDBType } from '~/types'

interface IGameService {
  createGame: (input: CreateGameInput) => Promise<Game>
  getGame: (input: GetItemInput) => Promise<Nullable<Game>>
}

class GameService implements IGameService {
  private mapper: Mapper<DDBGame, Promise<Game>> = async (from) => {
    return {
      ...from,
      // the Game resolver handles getting media data
      media: {
        type: 'VIDEO',
        url: '',
      },
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
      pk: `${DDBType.GAME}-${name.getFirst4Chars()}`,
      sk: name.normalizeGameName(),
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

    console.log('Created Game:', res)

    return this.mapper(Item)
  }
}

export const gameService = new GameService()
