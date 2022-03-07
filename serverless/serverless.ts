import type { AWS } from '@serverless/typescript';
// import hello from '@functions/hello';

const serviceName = 'game-progress-tracker';

const serverlessConfiguration: AWS = {
  service: '${self:custom.service}',
  frameworkVersion: '2',
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    region: 'us-east-2',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    lambdaHashingVersion: '20201221',
    tags: {
      service: serviceName,
    },
  },
  // import the function via paths
  // functions: { hello },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    stage: "${opt:stage, 'dev'}",
    service: `${serviceName}-\${self:custom.stage}`,
  },
  resources: {
    Resources: {
      table: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: '${self:custom.service}',
          BillingMode: 'PAY_PER_REQUEST',
          KeySchema: [
            {
              AttributeName: 'pk',
              KeyType: 'HASH',
            },
            {
              AttributeName: 'sk',
              KeyType: 'RANGE',
            },
          ],
          AttributeDefinitions: [
            {
              AttributeName: 'pk',
              AttributeType: 'S',
            },
            {
              AttributeName: 'sk',
              AttributeType: 'S',
            },
            {
              AttributeName: 'id',
              AttributeType: 'S',
            },
            {
              AttributeName: 'GSI1PK',
              AttributeType: 'S',
            },
            {
              AttributeName: 'GSI1SK',
              AttributeType: 'S',
            },
          ],
          GlobalSecondaryIndexes: [
            {
              IndexName: 'id-as-pk',
              Projection: {
                ProjectionType: 'ALL',
              },
              KeySchema: [
                {
                  AttributeName: 'id',
                  KeyType: 'HASH',
                },
              ],
            },
            {
              IndexName: 'flip-pk-sk',
              Projection: {
                ProjectionType: 'ALL',
              },
              KeySchema: [
                {
                  AttributeName: 'sk',
                  KeyType: 'HASH',
                },
                {
                  AttributeName: 'pk',
                  KeyType: 'RANGE',
                },
              ],
            },
            {
              IndexName: 'GSI1',
              Projection: {
                ProjectionType: 'ALL',
              },
              KeySchema: [
                {
                  AttributeName: 'GSI1PK',
                  KeyType: 'HASH',
                },
                {
                  AttributeName: 'GSI1SK',
                  KeyType: 'RANGE',
                },
              ],
            },
          ],
          TimeToLiveSpecification: {
            AttributeName: 'expires',
            Enabled: true,
          },
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
