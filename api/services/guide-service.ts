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
  // guide
  createGuide: (input: CreateGuideInput) => Promise<Guide>
  getGuide: (input: GetItemInput) => Promise<Nullable<Guide>>

  // guide section
  createGuideSection: (input: CreateGuideSectionInput) => Promise<Guide>
  listGuideSections: (input: { guideId: string }) => Promise<GuideSection[]>
}

class GuideService implements IGuideService {
  private guideMapper: Mapper<DDBGuide, Promise<Guide>> = async (from) => {
    return {
      ...from,

      // calc in another resolver
      isAddedToCollection: false,
      sections: [],
    }
  }

  private guideSectionMapper: Mapper<DDBGuideSection, Promise<GuideSection>> =
    async (from) => {
      return {
        ...from,

        // calc in another resolver
        items: [],
      }
    }

  private getGuideKey = ({
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

  private getGuideSectionKey = ({
    guideId,
    guideSectionId,
  }: {
    guideId: string
    guideSectionId: string
  }): DDBHashObject => {
    return {
      pk: `${DDBType.GUIDE_SECTION}#${guideId}`,
      sk: guideSectionId,
    }
  }

  private getDDBGuide = async ({ id }: GetItemInput) => {
    return ddbUtils.getItemById<DDBGuide, DDBGuide>({ id })
  }

  createGuide = async (input: CreateGuideInput) => {
    const id = input.id || cuid()
    const { gameId } = input

    const now = time()

    const item: DDBGuide = {
      ...input,
      ...this.getGuideKey({ gameId, guideId: id }),
      id,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
      type: DDBType.GUIDE,
    }

    return ddbUtils.createItem({ item, mapper: this.guideMapper })
  }

  getGuide = async ({ id }: GetItemInput) => {
    return ddbUtils.getItemById({ id, mapper: this.guideMapper })
  }

  createGuideSection = async (input: CreateGuideSectionInput) => {
    const id = input.id || cuid()
    const { guideId } = input

    const now = time()

    // TODO: account for cases where order is same as another item?

    const item: DDBGuideSection = {
      ...input,
      ...this.getGuideSectionKey({ guideId, guideSectionId: id }),
      id,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
      type: DDBType.GUIDE_SECTION,
    }

    await ddbUtils.createItem({ item, mapper: this.guideSectionMapper })

    // TODO: prob want to update guide timestamp too

    const ddbGuide = await this.getDDBGuide({ id: guideId })

    if (!ddbGuide) {
      // TODO: handle case where there is no guide for provided guideId
      throw new Error('Guide Service: Invalid guideId was provided')
    }

    return this.guideMapper(ddbGuide)
  }

  listGuideSections = async ({ guideId }: { guideId: string }) => {
    const queryCmd = new QueryCommand({
      TableName,
      KeyConditionExpression: '#pk = :pk',
      ExpressionAttributeNames: {
        '#pk': 'pk',
      },
      ExpressionAttributeValues: {
        ':pk': `${DDBType.GUIDE_SECTION}#${guideId}`,
      },
    })

    const ddbGuideSections = ((await ddbClient.send(queryCmd)).Items ||
      []) as DDBGuideSection[]

    const guideSections = await Promise.all(
      ddbGuideSections.map(this.guideSectionMapper),
    )

    guideSections.sort((a, b) => {
      return a.order - b.order
    })

    return guideSections
  }
}

export const guideService = new GuideService()
