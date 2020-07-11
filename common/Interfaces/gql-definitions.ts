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









export type Chat = {
  __typename?: 'Chat';
  _id: Scalars['String'];
  messages: Array<Maybe<Message>>;
  participants: Array<Maybe<User>>;
  createdAt: Scalars['String'];
  updatedAt?: Maybe<Scalars['String']>;
};

export type Message = {
  __typename?: 'Message';
  _id: Scalars['String'];
  text: Scalars['String'];
  chat: Chat;
  user: User;
  createdAt: Scalars['String'];
  updatedAt?: Maybe<Scalars['String']>;
};

export type Place = {
  __typename?: 'Place';
  _id: Scalars['String'];
  name: Scalars['String'];
  lat: Scalars['Float'];
  lng: Scalars['Float'];
  address: Scalars['String'];
  isFav: Scalars['Boolean'];
  createdAt: Scalars['String'];
  updatedAt?: Maybe<Scalars['String']>;
};

export enum RideStatus {
  Accepted = 'ACCEPTED',
  Finished = 'FINISHED',
  Canceled = 'CANCELED',
  Requesting = 'REQUESTING',
  OnRoute = 'ON_ROUTE'
}

export type PickupInfo = {
  __typename?: 'PickupInfo';
  lat: Scalars['Float'];
  lng: Scalars['Float'];
  address: Scalars['String'];
};

export type DropOffInfo = {
  __typename?: 'DropOffInfo';
  lat: Scalars['Float'];
  lng: Scalars['Float'];
};

export type Ride = {
  __typename?: 'Ride';
  _id: Scalars['String'];
  status: RideStatus;
  pickupInfo: PickupInfo;
  dropOffInfo: DropOffInfo;
  price: Scalars['Float'];
  duration: Scalars['String'];
  distance: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt?: Maybe<Scalars['String']>;
  driver: User;
  passenger: User;
};

export type LastPosition = {
  __typename?: 'LastPosition';
  lat?: Maybe<Scalars['Float']>;
  lng?: Maybe<Scalars['Float']>;
  orientation?: Maybe<Scalars['Float']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String'];
  fbid?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  verifiedEmail: Scalars['Boolean'];
  name: Scalars['String'];
  age?: Maybe<Scalars['Int']>;
  password?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  verifiedPhoneNumber: Scalars['Boolean'];
  profilePhoto?: Maybe<Scalars['String']>;
  isDriving: Scalars['Boolean'];
  isRiding: Scalars['Boolean'];
  isTaken: Scalars['Boolean'];
  lastPosition?: Maybe<LastPosition>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  chat?: Maybe<Chat>;
  messages?: Maybe<Array<Maybe<Message>>>;
  ridesAsPassenger?: Maybe<Array<Maybe<Ride>>>;
  ridesAsDriver?: Maybe<Array<Maybe<Ride>>>;
};

export type FbConnectInput = {
  name: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  fbid: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  USER_EMAIL_SIGN_IN: Scalars['String'];
  USER_FB_CONNECT?: Maybe<Scalars['String']>;
  USER_START_PHONE_VERIFICATION?: Maybe<Scalars['Boolean']>;
  _?: Maybe<Scalars['String']>;
};


export type MutationUser_Email_Sign_InArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationUser_Fb_ConnectArgs = {
  input?: Maybe<FbConnectInput>;
};


export type MutationUser_Start_Phone_VerificationArgs = {
  phoneNumber: Scalars['String'];
  withWhatsApp?: Maybe<Scalars['Boolean']>;
};

export enum VerificationTarget {
  Phone = 'PHONE',
  Email = 'EMAIL'
}

export type Verification = {
  __typename?: 'Verification';
  _id: Scalars['String'];
  target: VerificationTarget;
  payload: Scalars['String'];
  key: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};


export type Query = {
  __typename?: 'Query';
  _?: Maybe<Scalars['String']>;
};

export type AdditionalEntityFields = {
  path?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};


import { ObjectID } from 'mongodb';
export type ChatDbObject = {
  _id: ObjectID,
  messages: Array<Maybe<MessageDbObject>>,
  participants: Array<Maybe<UserDbObject>>,
  createdAt: Date,
  updatedAt?: Date,
};

export type MessageDbObject = {
  _id: ObjectID,
  text: string,
  chat: ChatDbObject,
  user: UserDbObject,
  createdAt: Date,
  updatedAt?: Date,
};

export type PlaceDbObject = {
  _id: ObjectID,
  name: string,
  lat: number,
  lng: number,
  address: string,
  isFav: boolean,
  createdAt: Date,
  updatedAt?: Date,
};

export type RideDbObject = {
  _id: ObjectID,
  pickupInfo: PickupInfo,
  dropOffInfo: DropOffInfo,
  price: number,
  duration: string,
  distance: string,
  createdAt: Date,
  updatedAt?: Date,
  driver: UserDbObject,
  passenger: UserDbObject,
};

export type UserDbObject = {
  _id: ObjectID,
  fbid?: Maybe<string>,
  email?: Maybe<string>,
  verifiedEmail: boolean,
  name: string,
  age?: Maybe<number>,
  password?: Maybe<string>,
  phoneNumber?: Maybe<string>,
  verifiedPhoneNumber: boolean,
  profilePhoto?: Maybe<string>,
  isDriving: boolean,
  isRiding: boolean,
  isTaken: boolean,
  lastPosition?: Maybe<LastPosition>,
  createdAt: Date,
  updatedAt: Date,
  chat?: Maybe<ChatDbObject>,
  messages?: Maybe<Array<Maybe<MessageDbObject>>>,
  ridesAsPassenger?: Maybe<Array<Maybe<RideDbObject>>>,
  ridesAsDriver?: Maybe<Array<Maybe<RideDbObject>>>,
};

export type VerificationDbObject = {
  _id: ObjectID,
  target: VerificationTarget,
  payload: string,
  key: string,
  createdAt: Date,
  updatedAt: Date,
};
