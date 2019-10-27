import { Imodels } from "@/models";
import { PostUserInput } from "@/Interfaces/Models";

type ResolverFn = (rootValue: any, args: any, context: Imodels, info?: any) => unknown;

type Iqueries = {
  [key: string]: ResolverFn;
}
const Mutations: Iqueries = {
  async postUser(_, { input }: {input: PostUserInput}, { User }) {
    try {
      const user = await User.create(input);
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};

export default Mutations;
