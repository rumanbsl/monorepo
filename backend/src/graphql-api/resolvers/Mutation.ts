import { ResolverFn } from "apollo-server-express";
import { Model } from "mongoose";
import { IuserModel } from "@/models/User";
import { IpostModel } from "@/models/Post";

interface Imutation {
  signUpUser: ResolverFn;
  addPost: ResolverFn;
}

interface IuserInput {
  userName: string;
  email: string;
  password: string;
}
interface IpostInput {
  title: string;
  imageUrl: string;
  catagories: [string];
  description: string;
  createdBy: IuserModel["id"];
}

export default {
  signUpUser: async (
    _: unknown,
    { userInput }: { userInput: IuserInput },
    { User }: { User: Model<IuserModel> },
  ) => {
    const { userName, email, password } = userInput;
    const user = await User.findOne({ $or: [{ userName }, { email }] });
    if (user) throw new Error("User Already Exists");
    return new User({ userName, email, password }).save();
  },
  addPost: async (
    _: unknown,
    { postInput }: { postInput: IpostInput },
    { Post, User }: { Post: Model<IpostModel>; User: Model<IuserModel> },
  ) => {
    const userExists = await User.findById(postInput.createdBy);
    if (!userExists) throw Error("User does not exists");
    const post = await new Post(postInput).save();
    return post;
  },
} as unknown as Imutation;
