import mongoose, { DocumentToObjectOptions } from "mongoose";
import { MessageDbObject, MessageOutput } from "@/Interfaces/gql-definitions";
import { ObjectID } from "@/Interfaces";
import User from "../User";
import Chat from "../Chat";
import methods, { MessageSchemaWithMethods } from "./methods";

export interface IMessageSchema extends mongoose.Document, Omit<MessageDbObject, "_id">{
  _id: ObjectID;
  toJSON:(options?:DocumentToObjectOptions) => MessageOutput
}

const MessageSchema = new mongoose.Schema({
  text : { type: String, required: true },
  chat : { type: mongoose.Types.ObjectId, ref: "Chat", required: true },
  user : { type: mongoose.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

MessageSchema
  .post("save", async function (this: IMessageSchema) {
    await User.updateOne({ _id: this.user }, { $push: { messages: this._id } });
    await Chat.updateOne({ _id: this.chat }, { $push: { messages: this._id } });
  })
  .post("deleteOne", async function (this: { getFilter: () => Partial<IMessageSchema> }) {
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
MessageSchema.methods = methods;
export default mongoose.model<MessageSchemaWithMethods>("Message", MessageSchema, "messages");
