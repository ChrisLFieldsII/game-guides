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
  DateTime: any;
};

type Account = {
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

type CreateAccountInput = {
  email: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
};

type Mutation = {
  createAccount: Account;
};


type MutationCreateAccountArgs = {
  input: CreateAccountInput;
};

type Query = {
  getAccount?: Maybe<Account>;
};


type QueryGetAccountArgs = {
  id: Scalars['ID'];
};
