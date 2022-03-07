import NextAuth from 'next-auth';
import { DynamoDBAdapter } from '@next-auth/dynamodb-adapter';

import { ddbClient, emailProvider } from '~/utils';

export default NextAuth({
  providers: [emailProvider],
  adapter: DynamoDBAdapter(ddbClient, {
    tableName: process.env.MY_AWS_TABLENAME,
  }),
});
