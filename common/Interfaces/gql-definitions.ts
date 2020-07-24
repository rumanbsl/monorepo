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









export type ChatOutput = {
  _id?: Maybe<Scalars['ID']>;
  createdAt: Scalars['String'];
  updatedAt?: Maybe<Scalars['String']>;
  messages: Array<Maybe<Scalars['ID']>>;
  passenger: Scalars['ID'];
  driver: Scalars['ID'];
  ride: Scalars['ID'];
};

export type Chat = {
  _id: Scalars['ID'];
  createdAt: Scalars['String'];
  updatedAt?: Maybe<Scalars['String']>;
  messages: Array<Message>;
  passenger?: Maybe<User>;
  driver?: Maybe<User>;
  ride: Ride;
};

export type Query = {
  CHAT_GET?: Maybe<ChatOutput>;
  RIDE_GET_INFORMATION?: Maybe<RideOutput>;
  RIDE_GET_NEARBY_DRIVER?: Maybe<RideOutput>;
  USER_GET?: Maybe<UserOutput>;
  USER_GET_PLACES: Array<Maybe<PlaceOutput>>;
  _?: Maybe<Scalars['String']>;
};


export type QueryChat_GetArgs = {
  chatId: Scalars['String'];
};


export type QueryRide_Get_InformationArgs = {
  rideId: Scalars['String'];
};

export type Mutation = {
  CHAT_SEND_MESSAGE: MessageOutput;
  RIDE_REQUEST_BY_PASSENGER: RideOutput;
  RIDE_UPDATE_STATUS_BY_DRIVER: Scalars['Boolean'];
  USER_ADD_PLACE: Scalars['Boolean'];
  USER_EDIT_PLACE: Scalars['Boolean'];
  USER_EMAIL_SIGN_IN: Scalars['String'];
  USER_EMAIL_SIGN_UP: Scalars['String'];
  USER_FB_CONNECT: Scalars['String'];
  USER_GET_NEARBY_DRIVERS: Array<Maybe<UserOutput>>;
  USER_REMOVE_PLACE: Scalars['Boolean'];
  USER_REPORT_MOVEMENT: LastPosition;
  USER_REVOKE_REFRESH_TOKEN: Scalars['Boolean'];
  USER_TOGGLE_DRIVING_MODE: Scalars['Boolean'];
  USER_UPDATE_PROFILE: UserOutput;
  VERIFICATION_EMAIL_COMPLETE: Scalars['Boolean'];
  VERIFICATION_EMAIL_START: Scalars['Boolean'];
  VERIFICATION_PHONE_COMPLETE?: Maybe<Scalars['String']>;
  VERIFICATION_PHONE_START?: Maybe<Scalars['Boolean']>;
  _?: Maybe<Scalars['String']>;
};


export type MutationChat_Send_MessageArgs = {
  chatId: Scalars['String'];
  text: Scalars['String'];
};


export type MutationRide_Request_By_PassengerArgs = {
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


export type MutationUser_Revoke_Refresh_TokenArgs = {
  userId: Scalars['String'];
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

export type Subscription = {
  ON_MESSAGE: MessageOutput;
  RIDE_PASSENGER_BROADCAST?: Maybe<RideOutput>;
  RIDE_STATUS_UPDATE_BY_DRIVER?: Maybe<RideOutput>;
  USER_DRIVERS_GET: UserOutput;
  _?: Maybe<Scalars['String']>;
};

export type MessageOutput = {
  _id?: Maybe<Scalars['ID']>;
  createdAt: Scalars['String'];
  updatedAt?: Maybe<Scalars['String']>;
  text: Scalars['String'];
  chat: Scalars['ID'];
  user: Scalars['ID'];
};

export type Message = {
  _id: Scalars['ID'];
  createdAt: Scalars['String'];
  updatedAt?: Maybe<Scalars['String']>;
  text: Scalars['String'];
  chat: Chat;
  user: User;
};

export type PlaceOutput = {
  _id?: Maybe<Scalars['ID']>;
  createdAt: Scalars['String'];
  updatedAt?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  lat: Scalars['Float'];
  lng: Scalars['Float'];
  address: Scalars['String'];
  isFav: Scalars['Boolean'];
  user: Scalars['ID'];
};

export type Place = {
  _id: Scalars['ID'];
  createdAt: Scalars['String'];
  updatedAt?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  lat: Scalars['Float'];
  lng: Scalars['Float'];
  address: Scalars['String'];
  isFav: Scalars['Boolean'];
  user: User;
};

export enum RideStatus {
  Accepted = 'ACCEPTED',
  Finished = 'FINISHED',
  Canceled = 'CANCELED',
  Requesting = 'REQUESTING',
  OnRoute = 'ON_ROUTE'
}

export type PickupInfo = {
  lat: Scalars['Float'];
  lng: Scalars['Float'];
  address: Scalars['String'];
};

export type DropOffInfo = {
  lat: Scalars['Float'];
  lng: Scalars['Float'];
};

export type RideOutput = {
  _id?: Maybe<Scalars['ID']>;
  createdAt: Scalars['String'];
  updatedAt?: Maybe<Scalars['String']>;
  status: RideStatus;
  pickupInfo: PickupInfo;
  dropOffInfo: DropOffInfo;
  price: Scalars['Float'];
  duration: Scalars['String'];
  distance: Scalars['String'];
  driver?: Maybe<Scalars['ID']>;
  passenger: Scalars['ID'];
  chat?: Maybe<Scalars['ID']>;
};

export type Ride = {
  _id: Scalars['ID'];
  createdAt: Scalars['String'];
  updatedAt?: Maybe<Scalars['String']>;
  status: RideStatus;
  pickupInfo: PickupInfo;
  dropOffInfo: DropOffInfo;
  price: Scalars['Float'];
  duration: Scalars['String'];
  distance: Scalars['String'];
  driver?: Maybe<User>;
  passenger: User;
  chat?: Maybe<Chat>;
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

export type LastPosition = {
  lat?: Maybe<Scalars['Float']>;
  lng?: Maybe<Scalars['Float']>;
  orientation?: Maybe<Scalars['Float']>;
};

export type User = {
  _id: Scalars['ID'];
  createdAt: Scalars['String'];
  updatedAt?: Maybe<Scalars['String']>;
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
  places: Array<Place>;
  messages: Array<Message>;
  ridesAsPassenger: Array<Ride>;
  ridesAsDriver: Array<Ride>;
  chatsAsPassenger: Array<Chat>;
  chatsAsDriver: Array<Chat>;
};

export type UserOutput = {
  _id?: Maybe<Scalars['ID']>;
  createdAt: Scalars['String'];
  updatedAt?: Maybe<Scalars['String']>;
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
  places: Array<Scalars['ID']>;
  messages: Array<Scalars['ID']>;
  ridesAsPassenger: Array<Scalars['ID']>;
  ridesAsDriver: Array<Scalars['ID']>;
  chatsAsPassenger: Array<Scalars['ID']>;
  chatsAsDriver: Array<Scalars['ID']>;
};

export enum VerificationTarget {
  Phone = 'PHONE',
  Email = 'EMAIL'
}

export type VerificationOutput = {
  _id?: Maybe<Scalars['ID']>;
  createdAt: Scalars['String'];
  updatedAt?: Maybe<Scalars['String']>;
  target: VerificationTarget;
  payload: Scalars['String'];
  key: Scalars['String'];
  verified: Scalars['Boolean'];
};

export type Verification = {
  _id: Scalars['ID'];
  createdAt: Scalars['String'];
  updatedAt?: Maybe<Scalars['String']>;
  target: VerificationTarget;
  payload: Scalars['String'];
  key: Scalars['String'];
  verified: Scalars['Boolean'];
};


export type AdditionalEntityFields = {
  path?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};


import { ObjectID } from 'mongodb';
export type ChatDbObject = {
  _id: ObjectID,
  createdAt: Date,
  updatedAt?: Date,
  messages: Array<MessageDbObject['_id']>,
  passenger?: Maybe<UserDbObject['_id']>,
  driver?: Maybe<UserDbObject['_id']>,
  ride: RideDbObject['_id'],
};

export type MessageDbObject = {
  _id: ObjectID,
  createdAt: Date,
  updatedAt?: Date,
  text: string,
  chat: ChatDbObject['_id'],
  user: UserDbObject['_id'],
};

export type PlaceDbObject = {
  _id: ObjectID,
  createdAt: Date,
  updatedAt?: Date,
  name: string,
  lat: number,
  lng: number,
  address: string,
  isFav: boolean,
  user: UserDbObject['_id'],
};

export type RideDbObject = {
  _id: ObjectID,
  createdAt: Date,
  updatedAt?: Date,
  status: RideStatus,
  pickupInfo: PickupInfo,
  dropOffInfo: DropOffInfo,
  price: number,
  duration: string,
  distance: string,
  driver?: Maybe<UserDbObject['_id']>,
  passenger: UserDbObject['_id'],
  chat?: Maybe<ChatDbObject['_id']>,
};

export type UserDbObject = {
  _id: ObjectID,
  createdAt: Date,
  updatedAt?: Date,
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
  places: Array<PlaceDbObject['_id']>,
  messages: Array<MessageDbObject['_id']>,
  ridesAsPassenger: Array<RideDbObject['_id']>,
  ridesAsDriver: Array<RideDbObject['_id']>,
  chatsAsPassenger: Array<ChatDbObject['_id']>,
  chatsAsDriver: Array<ChatDbObject['_id']>,
};

export type VerificationDbObject = {
  _id: ObjectID,
  createdAt: Date,
  updatedAt?: Date,
  target: VerificationTarget,
  payload: string,
  key: string,
  verified: boolean,
};
