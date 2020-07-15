import mongoose from "mongoose";
import { MessageDbObject } from "common/Interfaces/gql-definitions";
import { ObjectID } from "@/Interfaces";
import User from "../User";
import Chat from "../Chat";

export interface IMessageSchema extends mongoose.Document, Omit<MessageDbObject, "_id"> {
  _id: ObjectID;
}

const MessageSchema = new mongoose.Schema({
  text : { type: String, required: true },
  chat : { type: mongoose.Types.ObjectId, ref: "Chat", required: true },
  user : { type: mongoose.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

MessageSchema.post("deleteOne", async function (this: { getFilter: () => Partial<IMessageSchema> }) {
  const args = this.getFilter();
  if (args.user && args._id) {
    await Promise.all([
      User.updateOne({ _id: args.user }, { $pull: { places: args._id } }),
      Chat.updateOne({ _id: args.chat }, { $pull: { messages: args._id } }),
    ]);
  } else {
    console.warn("Message deleted without proper arguments, make sure to clean up");
  }
});

export default mongoose.model<IMessageSchema>("Message", MessageSchema, "messages");
