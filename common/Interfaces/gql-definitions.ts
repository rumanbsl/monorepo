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
  messages: Array<Message>;
  participants: Array<User>;
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
  user: User;
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
  driver?: Maybe<User>;
  passenger: User;
};

export type PickupInput = {
  lat: Scalars['Float'];
  lng: Scalars['Float'];
  address: Scalars['String'];
};

export type DropOffInput = {
  lat: Scalars['Float'];
  lng: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  RIDE_REQUEST: Ride;
  RIDE_UPDATE_STATUS_BY_DRIVER: Scalars['Boolean'];
  USER_ADD_PLACE: Scalars['Boolean'];
  USER_EDIT_PLACE: Scalars['Boolean'];
  USER_EMAIL_SIGN_IN: Scalars['String'];
  USER_EMAIL_SIGN_UP: Scalars['String'];
  USER_FB_CONNECT: Scalars['String'];
  USER_GET_NEARBY_DRIVERS: Array<Maybe<User>>;
  USER_REMOVE_PLACE: Scalars['Boolean'];
  USER_REPORT_MOVEMENT: LastPosition;
  USER_TOGGLE_DRIVING_MODE: Scalars['Boolean'];
  USER_UPDATE_PROFILE: User;
  VERIFICATION_EMAIL_COMPLETE: Scalars['Boolean'];
  VERIFICATION_EMAIL_START: Scalars['Boolean'];
  VERIFICATION_PHONE_COMPLETE?: Maybe<Scalars['String']>;
  VERIFICATION_PHONE_START?: Maybe<Scalars['Boolean']>;
  _?: Maybe<Scalars['String']>;
};


export type MutationRide_RequestArgs = {
  pickupInfo: PickupInput;
  dropOffInfo: DropOffInput;
  price: Scalars['Float'];
  duration: Scalars['String'];
  distance: Scalars['String'];
};


export type MutationRide_Update_Status_By_DriverArgs = {
  rideId: Scalars['String'];
  status: RideStatus;
};


export type MutationUser_Add_PlaceArgs = {
  name: Scalars['String'];
  lat: Scalars['Float'];
  lng: Scalars['Float'];
  address: Scalars['String'];
  isFav: Scalars['Boolean'];
};


export type MutationUser_Edit_PlaceArgs = {
  placeId: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  isFav?: Maybe<Scalars['Boolean']>;
};


export type MutationUser_Email_Sign_InArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationUser_Email_Sign_UpArgs = {
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  profilePhoto: Scalars['String'];
  age: Scalars['Int'];
  phoneNumber: Scalars['String'];
};


export type MutationUser_Fb_ConnectArgs = {
  name: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  fbid: Scalars['String'];
};


export type MutationUser_Remove_PlaceArgs = {
  placeId: Scalars['String'];
};


export type MutationUser_Report_MovementArgs = {
  lat?: Maybe<Scalars['Float']>;
  lng?: Maybe<Scalars['Float']>;
  orientation?: Maybe<Scalars['Float']>;
};


export type MutationUser_Update_ProfileArgs = {
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  profilePhoto?: Maybe<Scalars['String']>;
};


export type MutationVerification_Email_CompleteArgs = {
  key: Scalars['String'];
};


export type MutationVerification_Phone_CompleteArgs = {
  phoneNumber: Scalars['String'];
  key: Scalars['String'];
};


export type MutationVerification_Phone_StartArgs = {
  phoneNumber: Scalars['String'];
  withWhatsApp?: Maybe<Scalars['Boolean']>;
};

export type Query = {
  __typename?: 'Query';
  RIDE_GET_INFORMATION?: Maybe<Ride>;
  RIDE_GET_NEARBY_DRIVER?: Maybe<Ride>;
  USER_GET?: Maybe<User>;
  USER_GET_PLACES: Array<Maybe<Place>>;
  _?: Maybe<Scalars['String']>;
};


export type QueryRide_Get_InformationArgs = {
  rideId: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  RIDE_DRIVER_CURRENT_LOCATION?: Maybe<Ride>;
  USER_DRIVERS_GET: User;
  _?: Maybe<Scalars['String']>;
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
  chats?: Maybe<Array<Chat>>;
  places: Array<Place>;
  messages: Array<Message>;
  ridesAsPassenger: Array<Ride>;
  ridesAsDriver: Array<Ride>;
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
  verified: Scalars['Boolean'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};


export type AdditionalEntityFields = {
  path?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};


import { ObjectID } from 'mongodb';
export type ChatDbObject = {
  _id: ObjectID,
  messages: Array<MessageDbObject['_id']>,
  participants: Array<UserDbObject['_id']>,
  createdAt: Date,
  updatedAt?: Date,
};

export type MessageDbObject = {
  _id: ObjectID,
  text: string,
  chat: ChatDbObject['_id'],
  user: UserDbObject['_id'],
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
  user: UserDbObject['_id'],
  createdAt: Date,
  updatedAt?: Date,
};

export type RideDbObject = {
  _id: ObjectID,
  status: RideStatus,
  pickupInfo: PickupInfo,
  dropOffInfo: DropOffInfo,
  price: number,
  duration: string,
  distance: string,
  createdAt: Date,
  updatedAt?: Date,
  driver?: Maybe<UserDbObject['_id']>,
  passenger: UserDbObject['_id'],
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
  chats?: Maybe<Array<ChatDbObject['_id']>>,
  places: Array<PlaceDbObject['_id']>,
  messages: Array<MessageDbObject['_id']>,
  ridesAsPassenger: Array<RideDbObject['_id']>,
  ridesAsDriver: Array<RideDbObject['_id']>,
};

export type VerificationDbObject = {
  _id: ObjectID,
  target: VerificationTarget,
  payload: string,
  key: string,
  verified: boolean,
  createdAt: Date,
  updatedAt: Date,
};
