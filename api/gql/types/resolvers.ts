import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
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

export type Account = {
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Game = {
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['ID'];
  media: Media;
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Guide = {
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

export type GuideItem = {
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  isComplete?: Maybe<Scalars['Boolean']>;
  media: Array<Media>;
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type GuideSection = {
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  items: Array<GuideItem>;
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Media = {
  type: MediaType;
  url?: Maybe<Scalars['URL']>;
};

export type MediaType =
  | 'IMAGE'
  | 'VIDEO';

export type Mutation = {
  updateAccount: Account;
};


export type MutationUpdateAccountArgs = {
  input: UpdateAccountInput;
};

export type Query = {
  getAccount?: Maybe<Account>;
};


export type QueryGetAccountArgs = {
  id: Scalars['ID'];
};

export type UpdateAccountInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  email?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Account: ResolverTypeWrapper<Account>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Game: ResolverTypeWrapper<Game>;
  Guide: ResolverTypeWrapper<Guide>;
  GuideItem: ResolverTypeWrapper<GuideItem>;
  GuideSection: ResolverTypeWrapper<GuideSection>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Media: ResolverTypeWrapper<Media>;
  MediaType: MediaType;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  URL: ResolverTypeWrapper<Scalars['URL']>;
  UpdateAccountInput: UpdateAccountInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Account: Account;
  Boolean: Scalars['Boolean'];
  DateTime: Scalars['DateTime'];
  Game: Game;
  Guide: Guide;
  GuideItem: GuideItem;
  GuideSection: GuideSection;
  ID: Scalars['ID'];
  Media: Media;
  Mutation: {};
  Query: {};
  String: Scalars['String'];
  URL: Scalars['URL'];
  UpdateAccountInput: UpdateAccountInput;
};

export type AccountResolvers<ContextType = any, ParentType extends ResolversParentTypes['Account'] = ResolversParentTypes['Account']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type GameResolvers<ContextType = any, ParentType extends ResolversParentTypes['Game'] = ResolversParentTypes['Game']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  media?: Resolver<ResolversTypes['Media'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GuideResolvers<ContextType = any, ParentType extends ResolversParentTypes['Guide'] = ResolversParentTypes['Guide']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['Account']>, ParentType, ContextType>;
  createdById?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  game?: Resolver<Maybe<ResolversTypes['Game']>, ParentType, ContextType>;
  gameId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isAddedToCollection?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sections?: Resolver<Array<ResolversTypes['GuideSection']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GuideItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['GuideItem'] = ResolversParentTypes['GuideItem']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isComplete?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  media?: Resolver<Array<ResolversTypes['Media']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GuideSectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['GuideSection'] = ResolversParentTypes['GuideSection']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  items?: Resolver<Array<ResolversTypes['GuideItem']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MediaResolvers<ContextType = any, ParentType extends ResolversParentTypes['Media'] = ResolversParentTypes['Media']> = {
  type?: Resolver<ResolversTypes['MediaType'], ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['URL']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  updateAccount?: Resolver<ResolversTypes['Account'], ParentType, ContextType, RequireFields<MutationUpdateAccountArgs, 'input'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getAccount?: Resolver<Maybe<ResolversTypes['Account']>, ParentType, ContextType, RequireFields<QueryGetAccountArgs, 'id'>>;
};

export interface UrlScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['URL'], any> {
  name: 'URL';
}

export type Resolvers<ContextType = any> = {
  Account?: AccountResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Game?: GameResolvers<ContextType>;
  Guide?: GuideResolvers<ContextType>;
  GuideItem?: GuideItemResolvers<ContextType>;
  GuideSection?: GuideSectionResolvers<ContextType>;
  Media?: MediaResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  URL?: GraphQLScalarType;
};

