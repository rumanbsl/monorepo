import { MailService } from "@sendgrid/mail";

interface SendMailShape {
  sgMail: MailService;
  to: string,
  subject: string,
  body: string;
  asHTML?: boolean;
  key: string;
}

export async function sendEmail(pl: Omit<SendMailShape, "key">) {
  const { sgMail, to, subject, asHTML = false, body } = pl;

  await sgMail.send({
    from: "rumanbsl@gmail.com",
    to,
    subject,
    ...(asHTML ? { html: body } : { text: body }),
  });
}

export async function sendVerificationEMail(pl: Omit<SendMailShape, "body" | "subject">) {
  const body = `Your verification code is ${pl.key}`;
  await sendEmail({ ...pl, body, subject: "Welcome to Uber, Your verification code is included" });
}
