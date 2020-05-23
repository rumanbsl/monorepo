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


export type InputCreateTeam = {
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  plan?: Maybe<Plan>;
};

export type Mutation = {
  __typename?: 'Mutation';
  TEAM_BEFORE_CREATE: Scalars['String'];
  TEAM_CREATE: Scalars['String'];
  _?: Maybe<Scalars['String']>;
};


export type MutationTeam_Before_CreateArgs = {
  input?: Maybe<InputCreateTeam>;
};


export type MutationTeam_CreateArgs = {
  token: Scalars['String'];
};

export enum Plan {
  Team = 'TEAM',
  Individual = 'INDIVIDUAL',
  Super = 'SUPER'
}

export type Query = {
  __typename?: 'Query';
  USER_GET?: Maybe<User>;
  _?: Maybe<Scalars['String']>;
};


export type QueryUser_GetArgs = {
  id: Scalars['String'];
};

export type Team = {
  __typename?: 'Team';
  _id: Scalars['String'];
  plan: Plan;
  name: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  users: Array<User>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  role: UserRole;
};

export enum UserRole {
  SystemAdmin = 'SYSTEM_ADMIN',
  Admin = 'ADMIN',
  Editor = 'EDITOR',
  Viewer = 'VIEWER'
}


import { ObjectID } from 'mongodb';
export type UserDbObject = {
  _id: ObjectID,
  email: string,
  password: string,
  role: UserRole,
};

export type TeamDbObject = {
  _id: ObjectID,
  plan: Plan,
  name: string,
  createdAt: Date,
  updatedAt: Date,
  users: Array<UserDbObject['_id']>,
};
