type GetItemInput = {
  id: string
}

type Nullable<T> = T | null

interface String {
  getFirst4Chars(): string
  normalizeGameName(): string
}

type Mapper<From, To> = (from: From) => To

type Edge<T> = {
  node: T
  cursor: string
}

type ListItemsRes<T> = {
  items: T[]
  pageInfo: PageInfo
}

type Connection<T> = ListItemsRes<T> & {
  edges: Edge<T>[]
}

interface GetConnectionCmd<Input, Output> {
  items?: Input[]
  mapper: Mapper<Input, Promise<Output>>
  opts: {
    hasNextPage: boolean
  }
}
