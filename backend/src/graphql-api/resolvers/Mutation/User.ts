import Joi from "@hapi/joi";
import jwt from "jsonwebtoken";
import sendGrid from "@sendgrid/mail";
import { promisify } from "util";
import bcrypt from "bcrypt";
import { PostUserInput, LoginInput } from "@/Interfaces/gql-definitions";
import tryCatchWrapper from "@/utils/tryCatchWrapper";
import regex from "@/utils/regex";
import { Imutations } from "@/Interfaces";

sendGrid.setApiKey(process.env.SENDGRID_API_KEY);
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

    const password = await hash(input.password, 10);
    // Send Activation Email
    // 01. create a token with user info
    const token = jwt.sign({ ...input, password }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });
    await sendGrid.send({
      from    : "rumanbsl@outlook.com",
      to      : input.email,
      subject : "Activation Email",
      html    : `
        <h1>Thank you for signing up!</h1>
        <p>Please click <a href="/signup?token=${token}">here</a> to complete the signup process</p>
      `,
    });
    return `Activation link sent to ${input.email}`;
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
