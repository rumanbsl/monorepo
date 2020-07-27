import Div from "@/components/Div";
import PhoneLogin from "@/components/CountryInput";
import FacebookLogin from "./components/FacebookLogin";
import EmailLogin from "./components/emailLogin";

export default () => (
  <Div mt="XL">
    <FacebookLogin />
    <PhoneLogin phoneNumberWithCode="" onSetPhoneNumber={console.log} />
    <EmailLogin />
  </Div>
);
