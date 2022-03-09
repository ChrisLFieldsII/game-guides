export const region = process.env.NEXT_AUTH_AWS_REGION
export const accessKeyId = process.env.MY_AWS_ACCESS_KEY
export const secretAccessKey = process.env.MY_AWS_SECRET_ACCESS_KEY
export const TableName = process.env.MY_AWS_TABLENAME

export enum GSI {
  ID_AS_PK = 'id-as-pk',
  FLIP_PK_SK = 'flip-pk-sk',
}
