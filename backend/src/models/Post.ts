import mongoose from "mongoose";
import { Ipost } from "src/interfaces";

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  catagories: {
    type: [String],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now()
  },
  likes: {
    type: Number,
    default: 0
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },

  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    }
  ]
});

schema.virtual("id").get(function() {
  //@ts-ignore
  return this._id.toString();
});
export interface IpostModel extends Ipost, mongoose.Document {id:string}
export default mongoose.model<IpostModel>("Post", schema, "posts");
