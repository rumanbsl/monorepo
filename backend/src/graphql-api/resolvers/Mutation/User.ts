import Joi from "@hapi/joi";
import { promisify } from "util";
import bcrypt from "bcrypt";
import { Imodels } from "@/models";
import { PostUserInput } from "@/Interfaces/Models";
import tryCatchWrapper from "@/utils/tryCatchWrapper";

const hash = promisify(bcrypt.hash);

type ResolverFn = (rootValue: any, args: any, context: Imodels, info?: any) => unknown;

type Iqueries = {
  [key: string]: ResolverFn;
}
const Mutations: Iqueries = {
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  postUser: tryCatchWrapper(async (_, { input }: {input: PostUserInput}, { User }) => {
    const emailRegEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    const passWordRegex = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;
    const validation = Joi
      .object({
        email    : Joi.string().regex(emailRegEx),
        password : Joi.string().regex(passWordRegex),
      });
    const { error } = validation.validate({ email: input.email, password: input.password });
    if (error) throw error;

    const password = await hash(input.password, 10);
    const user = await User.create({ ...input, password });
    return user;
  }),
};

export default Mutations;
