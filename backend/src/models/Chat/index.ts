import mongoose from "mongoose";
import { ChatDbObject } from "common/Interfaces/gql-definitions";
import { ObjectID } from "@/Interfaces";

export interface IChatSchema extends mongoose.Document, Omit<ChatDbObject, "_id"> {
  _id: ObjectID
}

const ChatSchema = new mongoose.Schema({
  messages     : [{ type: mongoose.Types.ObjectId, ref: "Message", required: true }],
  participants : [{ type: mongoose.Types.ObjectId, ref: "User", required: true }],
}, { timestamps: true });

export default mongoose.model("Chat", ChatSchema, "Chats");
