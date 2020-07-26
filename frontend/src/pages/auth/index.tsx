// import EmailLogin from "./components/emailLogin";
import { useState } from "react";
import CountryInput from "@/components/CountryInput";

export default () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  // const [activeComponent, setActiveComponent] = useState<"login"|"signup">("login");
  return (
    <div>
      <CountryInput onSetPhoneNumber={(num) => { setPhoneNumber(num); }} phoneNumberWithCode={phoneNumber} />
      {phoneNumber}
    </div>
  );
  // return <EmailLogin />;
};
