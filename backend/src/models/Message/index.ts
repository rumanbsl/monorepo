import mongoose, { DocumentToObjectOptions } from "mongoose";
import { MessageDbObject, Message } from "common/Interfaces/gql-definitions";
import User from "../User";
import Chat from "../Chat";

interface Shape extends Omit<Message, "_id"> {
  _id: mongoose.Types.ObjectId;
}
export interface IMessageSchema extends mongoose.Document, Omit<MessageDbObject, "_id"> {
  _id: mongoose.Types.ObjectId;
  toJSON: (options?: DocumentToObjectOptions) => Shape;
}

const MessageSchema = new mongoose.Schema({
  text : { type: String, required: true },
  chat : { type: mongoose.Types.ObjectId, ref: "Chat", required: true },
  user : { type: mongoose.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

MessageSchema.post("deleteOne", async function (this: { getFilter: () => Partial<Shape> }) {
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
