import NextAuth from 'next-auth'
import { DynamoDBAdapter } from '@next-auth/dynamodb-adapter'

import { ddbClient, emailProvider } from '~/utils'
import { accountService } from '~/services'

export default NextAuth({
  providers: [emailProvider],
  adapter: DynamoDBAdapter(ddbClient, {
    tableName: process.env.MY_AWS_TABLENAME,
  }),
  events: {
    createUser: (event) => {
      const { user } = event

      accountService.updateAccount({
        id: user.id,
        name: user.id, // cant set name to empty string or ddb considers it null.
        createdAt: new Date().toISOString(),
      })
    },
  },
})
