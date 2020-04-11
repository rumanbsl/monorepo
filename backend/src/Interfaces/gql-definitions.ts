export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};









export type AdditionalEntityFields = {
  path?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};


export type GetUserInput = {
  _id: Scalars['String'];
};

export type GetUsersInput = {
  limit?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
   __typename?: 'Mutation';
  _?: Maybe<Scalars['String']>;
  createUserActivationEmail: Scalars['String'];
  loginUser: Scalars['String'];
};


export type MutationCreateUserActivationEmailArgs = {
  input: PostUserInput;
};


export type MutationLoginUserArgs = {
  input: LoginInput;
};

export type PostUserInput = {
  name: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
  sex?: Maybe<Sex>;
};

export type Query = {
   __typename?: 'Query';
  _?: Maybe<Scalars['String']>;
  getUser: User;
  getUsers: Array<Maybe<User>>;
};


export type QueryGetUserArgs = {
  input: GetUserInput;
};


export type QueryGetUsersArgs = {
  input?: Maybe<GetUsersInput>;
};

export enum Sex {
  Male = 'Male',
  Female = 'Female'
}

export type User = {
   __typename?: 'User';
  _id: Scalars['String'];
  password: Scalars['String'];
  name: Scalars['String'];
  email: Scalars['String'];
  sex: Sex;
  role: Scalars['Int'];
};

import { ObjectID } from 'mongodb';
export type UserDbObject = {
  _id: ObjectID,
  password: string,
  name: string,
  email: string,
  sex: Sex,
  role: number,
};
