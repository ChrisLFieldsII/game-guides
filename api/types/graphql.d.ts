type Maybe<T> = T | null;
type InputMaybe<T> = Maybe<T>;
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt. */
  URL: any;
};

type Account = {
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

type CreateGameInput = {
  description: Scalars['String'];
  id?: InputMaybe<Scalars['ID']>;
  name: Scalars['String'];
};

type Game = {
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['ID'];
  media: Media;
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

type Guide = {
  createdAt: Scalars['DateTime'];
  createdBy?: Maybe<Account>;
  createdById: Scalars['ID'];
  game?: Maybe<Game>;
  gameId: Scalars['ID'];
  id: Scalars['ID'];
  isAddedToCollection: Scalars['Boolean'];
  name: Scalars['String'];
  sections: Array<GuideSection>;
  updatedAt: Scalars['DateTime'];
};

type GuideItem = {
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['ID'];
  isComplete?: Maybe<Scalars['Boolean']>;
  media: Array<Media>;
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

type GuideSection = {
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['ID'];
  items: Array<GuideItem>;
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

type Media = {
  type: MediaType;
  url: Scalars['URL'];
};

type MediaType =
  | 'IMAGE'
  | 'VIDEO';

type Mutation = {
  createGame: Game;
  updateAccount: Account;
};


type MutationCreateGameArgs = {
  input: CreateGameInput;
};


type MutationUpdateAccountArgs = {
  input: UpdateAccountInput;
};

type Query = {
  getAccount?: Maybe<Account>;
  getGame?: Maybe<Game>;
};


type QueryGetAccountArgs = {
  id: Scalars['ID'];
};


type QueryGetGameArgs = {
  id: Scalars['ID'];
};

type UpdateAccountInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  email?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
};
