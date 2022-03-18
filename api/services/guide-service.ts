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

interface IGuideService {
  createGuide: (input: CreateGuideInput) => Promise<Guide>
  getGuide: (input: GetItemInput) => Promise<Nullable<Guide>>
}

class GuideService implements IGuideService {
  private mapper: Mapper<DDBGuide, Promise<Guide>> = async (from) => {
    return {
      ...from,

      // calculated in another resolver
      isAddedToCollection: false,
      sections: [],
    }
  }

  private getKey = ({
    gameId,
    guideId,
  }: {
    gameId: string
    guideId: string
  }): DDBHashObject => {
    return {
      pk: `${DDBType.GUIDE}#${gameId}`,
      sk: guideId,
    }
  }

  createGuide = async (input: CreateGuideInput) => {
    const id = input.id || cuid()
    const { gameId } = input

    const now = time()

    const item: DDBGuide = {
      ...input,
      id,
      ...this.getKey({ gameId, guideId: id }),
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
      type: DDBType.GUIDE,
    }

    return ddbUtils.createItem({ item, mapper: this.mapper })
  }

  getGuide = async ({ id }: GetItemInput) => {
    return ddbUtils.getItemById({ id, mapper: this.mapper })
  }
}

export const guideService = new GuideService()
