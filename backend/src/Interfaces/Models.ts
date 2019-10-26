export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};









export type AdditionalEntityFields = {
  path?: Maybe<Scalars['String']>,
  type?: Maybe<Scalars['String']>,
};

export type Mutation = {
   __typename?: 'Mutation',
  _?: Maybe<Scalars['String']>,
};

export type Query = {
   __typename?: 'Query',
  _?: Maybe<Scalars['String']>,
  getUser: User,
  getBoo: Scalars['String'],
};


export type QueryGetUserArgs = {
  input: UserInput
};

export enum Sex {
  Male = 'Male',
  Female = 'Female'
}

export type User = {
   __typename?: 'User',
  _id: Scalars['String'],
  name: Scalars['String'],
  age: Scalars['Int'],
  email?: Maybe<Scalars['String']>,
  sex?: Maybe<Sex>,
};

export type UserInput = {
  _id: Scalars['String'],
};

import { ObjectID } from 'mongodb';
export type UserDbObject = {
  _id: ObjectID,
  name: string,
  age: number,
  email?: Maybe<string>,
  sex?: Maybe<Sex>,
};
