import countriesWithPhoneCode from "@/utils/countriesWithPhoneCode";
import Icon from "@/components/Icon";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "../Button";
import Input from "../Form/Input";

const CountryInput = styled.div`
  display: inline-flex;
  position: relative;

  * {
    white-space: nowrap;
  }
`;

const Dropdown = styled.div<{showDropdown: boolean}>`
margin: 0.2rem 0.2rem 0 0;
position: relative;
transition: display 1s ease-out;

ul.dropdown-content {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 1rem;
  display: ${({ showDropdown }) => (showDropdown ? "inherit" : "none")};
  margin: 0;
  max-height: 30rem;
  max-width: 19rem;
  overflow-x: hidden;
  overflow-y: scroll;
  padding: 0;
  position: absolute;
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
  onSetPhoneNumber: (phoneNumber: string)=>void;
  phoneNumberWithCode: string;
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

export default function CountryInputComponent(props: PropShape) {
  const { onSetPhoneNumber, phoneNumberWithCode } = props;
  const [dialCode, num] = phoneNumberWithCode.split(" ");
  const [phoneNumber, setPhoneNumber] = useState(dialCode || "");
  const [countryCode, setCountryCode] = useState(num || "");
  const [showDropdown, toggleShowDropdown] = useState(false);
  useEffect(() => {
    if (countryCode) onSetPhoneNumber(`${countryCode} ${phoneNumber}`);
  }, [countryCode, phoneNumber, onSetPhoneNumber]);

  const selectedCountry = countriesWithPhoneCode.find((c) => c.dial_code === countryCode);

  return (
    <CountryInput>
      <Dropdown showDropdown={showDropdown} tabIndex={0} onBlur={() => { toggleShowDropdown(() => false); }}>
        <ButtonComponent variant="outline" onClick={() => { toggleShowDropdown(() => !showDropdown); }} showDropdown={showDropdown}>
          {selectedCountry ? `${selectedCountry.flag} ${selectedCountry.dial_code}` : "Choose a country" }
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
        onChange={(e) => {
          const value = parseInt(e.target.value, 10);
          if (value >= 0 || e.target.value === "") {
            setPhoneNumber(!Number.isNaN(value) ? value.toString() : "");
          }
        }}
      />
    </CountryInput>
  );
}
