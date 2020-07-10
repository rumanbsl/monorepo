export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};









export type InputCreateCustomer = {
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  plan?: Maybe<Plan>;
};

export type Mutation = {
  __typename?: 'Mutation';
  USER_LOGIN: Scalars['String'];
  USER_LOGOUT?: Maybe<Scalars['Boolean']>;
  _?: Maybe<Scalars['String']>;
  beforeCreateCustomer: Scalars['String'];
  createCustomer: Scalars['String'];
};


export type MutationUser_LoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationBeforeCreateCustomerArgs = {
  input?: Maybe<InputCreateCustomer>;
};


export type MutationCreateCustomerArgs = {
  token: Scalars['String'];
};

export enum Plan {
  Team = 'TEAM',
  Individual = 'INDIVIDUAL',
  Super = 'SUPER'
}

export type Team = {
  __typename?: 'Team';
  _id: Scalars['String'];
  plan: Plan;
  name: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  users: Array<User>;
};

export enum UserRole {
  SystemAdmin = 'SYSTEM_ADMIN',
  Admin = 'ADMIN',
  Editor = 'EDITOR',
  Viewer = 'VIEWER'
}

export type User = {
  __typename?: 'User';
  _id: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  role: UserRole;
};

export type Query = {
  __typename?: 'Query';
  USER_GET?: Maybe<User>;
  _?: Maybe<Scalars['String']>;
};


export type AdditionalEntityFields = {
  path?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};


import { ObjectID } from 'mongodb';
export type TeamDbObject = {
  _id: ObjectID,
  plan: Plan,
  name: string,
  createdAt: Date,
  updatedAt: Date,
  users: Array<UserDbObject['_id']>,
};

export type UserDbObject = {
  _id: ObjectID,
  email: string,
  password: string,
  role: UserRole,
};
