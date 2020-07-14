import mongoose, { DocumentToObjectOptions } from "mongoose";
import { ChatDbObject, Chat } from "common/Interfaces/gql-definitions";
import Message from "../Message";
import User from "../User";

interface Shape extends Omit<Chat, "_id"> {
  _id: mongoose.Types.ObjectId;
}
export interface IChatSchema extends mongoose.Document, Omit<ChatDbObject, "_id"> {
  _id: mongoose.Types.ObjectId;
  toJSON:(options?:DocumentToObjectOptions) => Shape
}

const ChatSchema = new mongoose.Schema({
  messages     : [{ type: mongoose.Types.ObjectId, ref: "Message", required: true }],
  participants : [{ type: mongoose.Types.ObjectId, ref: "User", required: true }],
}, { timestamps: true });

ChatSchema.post("deleteOne", async function (this: { getFilter: () => Partial<Shape> }) {
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
