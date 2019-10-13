import { ResolverFn } from "apollo-server-express";
import { Model } from "mongoose";
import { IpostModel } from "@/src/models/Post";

interface Iquery {
  getPosts: ResolverFn;
}

export default {
  getPosts: async (_: unknown, __: unknown, { Post }: { Post: Model<IpostModel> }) => {
    const posts = await Post.find()
      .sort({ createdDate: 1 })
      .populate({
        path  : "createdBy",
        model : "User",
      });
    return posts;
  },
} as unknown as Iquery;
