import { Twilio } from "twilio";

interface TwilioPayload {to: string, TwilioClient: Twilio; withWhatsApp?: boolean}
interface TwilioPayloadWithBody extends TwilioPayload {
  body: string
}
interface TwilioPayloadWithKey extends TwilioPayload {
  key: string
}
export function sendSMS({ to, body, TwilioClient, withWhatsApp }: TwilioPayloadWithBody) {
  const { TWILIO_MY_PHONE_NUMBER, TWILIO_WHATSAPP_NUMBER } = process.env;
  const twilioBody = {
    to   : withWhatsApp ? `whatsapp:${to}` : to,
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    from : withWhatsApp ? `whatsapp:${TWILIO_WHATSAPP_NUMBER}` : TWILIO_MY_PHONE_NUMBER,
    body,
  };

  return TwilioClient.messages.create(twilioBody);
}

export function sendVerificationSMS({ to, key, TwilioClient, withWhatsApp }: TwilioPayloadWithKey) {
  return sendSMS({
    to,
    body: `Your verification code is ${key}`,
    TwilioClient,
    withWhatsApp,
  });
}
