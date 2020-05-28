import sendGrid from "@sendgrid/mail";
import jwt from "jsonwebtoken";

import { InputCreateCustomer } from "@/Interfaces/gql-definitions";

sendGrid.setApiKey(process.env.SENDGRID_API_KEY);

export default async function sendActivationEmail(pl: InputCreateCustomer) {
  const token = jwt.sign(pl, process.env.JWT_ACCOUNT_ACTIVATION, { expiresIn: "1h" });

  // NOT SENDING EMAIL FOR THE TIME BEING
  const boo = "[]";
  if (typeof boo === "number") {
    await sendGrid.send({
      from    : "rumanbsl@gmail.com",
      to      : pl.email,
      subject : "Activate your account",
      html    : `
      <h2>Hello</h2>
      <p>Please activate your account by clicking <a href="${process.env.SITE_URL}/auth/activation/${token}">here</a></p>
      <p>This link will expire in 10 minutes</p>
      <p>Cannot See the link?</p>
      <p>${process.env.SITE_URL}/auth/activation/${token}</p>
    `,
    });
  }
  return token;
}
