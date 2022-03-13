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
  createGame: (input: CreateGameInput) => Promise<Nullable<Game>>
}

class GameService implements IGameService {
  private mapper: Mapper<DDBGame, Promise<Game>> = async (from) => {
    return {
      ...from,
      // TODO: add media functionality
      media: {
        type: 'IMAGE',
        url: 'https://play-lh.googleusercontent.com/HUuQc4Zpl6x7fUyX-jFMmcuUbW77REw4UKl5rfhHfP4VY6ctBU1w1I_RZWsXaojFgIo',
      },
    }
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

    console.log('====== Created Game', res)

    return this.mapper(Item)
  }
}

export const gameService = new GameService()
