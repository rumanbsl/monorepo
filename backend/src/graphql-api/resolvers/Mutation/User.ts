import Joi from "@hapi/joi";
import jwt from "jsonwebtoken";
import { promisify } from "util";
import bcrypt from "bcrypt";
import { PostUserInput, LoginInput } from "@/Interfaces/gql-definitions";
import tryCatchWrapper from "@/utils/tryCatchWrapper";
import regex from "@/utils/regex";
import { Imutations } from "@/Interfaces";

const hash = promisify(bcrypt.hash);
const compare = promisify(bcrypt.compare);

const Mutations: Imutations = {
  createUserActivationEmail: tryCatchWrapper(async (_, { input }: {input: PostUserInput}, { User }) => {
    const validation = Joi
      .object({
        email    : Joi.string().regex(regex.emailRegEx),
        password : Joi.string().regex(regex.passWordRegex),
      });
    const { error } = validation.validate({ email: input.email, password: input.password });
    if (error) throw error;

    const userExists = await User.countDocuments({ email: input.email }).limit(1);
    if (userExists) throw { message: `User with email '${input.email}' exists already in DB. Please Login`, code: 401 };

    // Send Activation Email
    // 01. create a token with user info
    const password = await hash(input.password, 10);
    console.log({ ...input, password });
    return "ok";
  }),
  loginUser: tryCatchWrapper(async (_, { input }: {input: LoginInput}, { User }) => {
    const user = await User.findOne({ email: input.email });
    if (!user) throw { message: "No user found", code: 404 };
    const passwordMatch = compare(input.password, user.password);
    if (!passwordMatch) throw { message: "Password Mismatch", code: 402 };
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });
    return token;
  }),
};

export default Mutations;
