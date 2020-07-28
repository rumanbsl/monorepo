import countriesWithPhoneCode from "@/utils/countriesWithPhoneCode";
import Icon from "@/components/Icon";
import { useState } from "react";
import styled from "styled-components";
import { phoneRegEx } from "common/regex";
import { ToastContainer, toast } from "react-toastify";
import Button from "../Button";
import Input from "../Form/Input";

const PhoneInput = styled.div`
  display: inline-flex;
  position: relative;

  > * {
    white-space: nowrap;
  }
`;

const Dropdown = styled.div<{showDropdown: boolean}>`
position: relative;
transition: display 1s ease-out;
width: 17rem;

button {
  height: 5.2rem;
  width: inherit;
}

ul.dropdown-content {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 1rem;
  display: ${({ showDropdown }) => (showDropdown ? "inherit" : "none")};
  margin: 0;
  max-height: 40rem;
  overflow-x: hidden;
  overflow-y: scroll;
  padding: 0;
  position: absolute;
  width: inherit;
  z-index: 1;

  li {
    list-style: none;

    button {
      background: #fff;
      border: 0;
      cursor: pointer;
      display: inherit;
      padding: 1rem 1rem 1rem 2rem;
      text-align: initial;
      width: 100%;
    }

    &:hover,
    &:hover > button {
      background: #eee;
    }
  }
}
`;

type CountryShape = typeof countriesWithPhoneCode[number];

function Country({ country, onSelect }: {country: CountryShape; onSelect: (cc: CountryShape["dial_code"])=>void}) {
  return (
    <li>
      <button
        type="button"
        onClick={() => { onSelect(country.dial_code); }}
      >
        {country.flag}
        {" "}
        {country.name}
      </button>
    </li>
  );
}

interface PropShape {
  phoneNumberWithCode: [CountryShape["dial_code"], string];
  onSetPhoneNumber: (phoneNumberWithCode: PropShape["phoneNumberWithCode"])=>void;
}

const ButtonComponent = styled(Button)<{showDropdown?: boolean}>`
  svg {
    fill: ${({ theme }) => theme.colors.primary};
    height: 2rem;
    margin-left: 1rem;
    transform: ${({ showDropdown }) => (showDropdown ? "rotate(90deg)" : "rotate(270deg)")};
    transition: fill 100ms ease-in, transform 100ms ease-in;
    width: 2rem;
  }
`;

export default function PhoneInputComponent(props: PropShape) {
  const { onSetPhoneNumber, phoneNumberWithCode } = props;
  const [dialCode, num] = phoneNumberWithCode;
  const [phoneNumber, setPhoneNumber] = useState(num);
  const [countryCode, setCountryCode] = useState(dialCode);
  const [showDropdown, toggleShowDropdown] = useState(false);

  const onPressSubmitButton = (phone: {countryCode: CountryShape["dial_code"], phoneNumber: string}) => {
    if (phoneRegEx.test(`${phone.countryCode}${phone.phoneNumber}`) && phone.countryCode && phone.phoneNumber) {
      onSetPhoneNumber([phone.countryCode, phone.phoneNumber]);
    } else {
      toast.error("Invalid phone number", { autoClose: 2000 });
    }
  };

  const selectedCountry = countriesWithPhoneCode.find((c) => c.dial_code === countryCode);

  return (
    <PhoneInput>
      <Dropdown showDropdown={showDropdown} tabIndex={0} onBlur={() => { toggleShowDropdown(() => false); }}>
        <ButtonComponent variant="outline" onClick={() => { toggleShowDropdown(() => !showDropdown); }} showDropdown={showDropdown}>
          {selectedCountry ? `${selectedCountry.flag} ${selectedCountry.dial_code}` : "Country Code" }
          <Icon name="arrow" />
        </ButtonComponent>
        <ul className="dropdown-content">
          {countriesWithPhoneCode.map((country) => (
            <Country
              key={country.code}
              country={country}
              onSelect={(cc: CountryShape["dial_code"]) => { setCountryCode(cc); toggleShowDropdown(() => false); }}
            />
          ))}
        </ul>
      </Dropdown>
      <Input
        <"string">
        type="text"
        value={phoneNumber}
        placeholder="phone number"
        style={{ margin: "0 0.4rem" }}
        onChange={(e) => {
          const value = parseInt(e.target.value, 10);
          if (value >= 0 || e.target.value === "") {
            setPhoneNumber(!Number.isNaN(value) ? value.toString() : "");
          }
        }}
      />
      <Button onClick={() => onPressSubmitButton({ countryCode, phoneNumber })}>submit</Button>
      <ToastContainer />
    </PhoneInput>
  );
}
