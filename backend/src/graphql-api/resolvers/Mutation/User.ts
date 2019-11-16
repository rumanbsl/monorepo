import Joi from "@hapi/joi";
import jwt from "jsonwebtoken";
import { promisify } from "util";
import bcrypt from "bcrypt";
import { PostUserInput, LoginInput } from "@/Interfaces/Models";
import tryCatchWrapper from "@/utils/tryCatchWrapper";
import { ResolverFn } from "@/Interfaces";

const hash = promisify(bcrypt.hash);
const compare = promisify(bcrypt.compare);

type Iqueries = {
  [key: string]: ResolverFn;
}
const Mutations: Iqueries = {
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
  loginUser: tryCatchWrapper(async (_, { input }: {input: LoginInput}, { User }) => {
    const user = await User.findOne({ email: input.email });
    if (!user) throw new Error("No user found");
    const passwordMatch = compare(input.password, user.password);
    if (!passwordMatch) throw new Error("Password Mismatch");
    console.log(process.env.JWT_SECRET_KEY, "................");
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET_KEY as string, { expiresIn: "1d" });
    return token;
  }),
};

export default Mutations;
