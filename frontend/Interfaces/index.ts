/* eslint-disable import/no-extraneous-dependencies */
import { ObjectID as bsonID } from "bson";

export interface ObjectID extends bsonID {
  toString: () => string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RequestProps {

}
