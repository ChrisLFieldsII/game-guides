type GetItemInput = {
  id: string
}

type Nullable<T> = T | null

interface String {
  getFirst4Chars(): string
  normalizeGameName(): string
}

type Mapper<From, To> = (from: From) => To
