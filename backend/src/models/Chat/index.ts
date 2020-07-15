import mongoose from "mongoose";
import { ChatDbObject } from "common/Interfaces/gql-definitions";
import { ObjectID } from "@/Interfaces";
import Message from "../Message";
import User from "../User";

export interface IChatSchema extends mongoose.Document, Omit<ChatDbObject, "_id"> {
  _id: ObjectID;
}

const ChatSchema = new mongoose.Schema({
  messages     : [{ type: mongoose.Types.ObjectId, ref: "Message", required: true }],
  participants : [{ type: mongoose.Types.ObjectId, ref: "User", required: true }],
}, { timestamps: true });

ChatSchema.post("deleteOne", async function (this: { getFilter: () => Partial<IChatSchema> }) {
  const args = this.getFilter();

  if (args._id) {
    await Promise.all([
      Message.deleteMany({ chat: args._id, user: { $in: args.participants } }),
      User.updateOne({ _id: { $in: args.participants } }, { $pull: { chat: args._id } }),
    ]);
  } else {
    console.warn("Chat deleted without proper arguments, make sure to clean up");
  }
});

export default mongoose.model<IChatSchema>("Chat", ChatSchema, "Chats");
