import mongoose from "mongoose";
import { MessageDbObject } from "common/Interfaces/gql-definitions";

export interface IMessageSchema extends mongoose.Document, Omit<MessageDbObject, "_id"> {
  _id: mongoose.Types.ObjectId
}

const MessageSchema = new mongoose.Schema({
  text : { type: String, required: true },
  chat : { type: mongoose.Types.ObjectId, ref: "Chat", required: true },
  user : { type: mongoose.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

export default mongoose.model<IMessageSchema>("Message", MessageSchema, "messages");
