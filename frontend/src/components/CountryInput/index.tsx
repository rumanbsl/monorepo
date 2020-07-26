import countriesWithPhoneCode from "@/utils/countriesWithPhoneCode";
import Icon from "@/components/Icon";
import { useState, useEffect } from "react";

import styled from "styled-components";
import Button from "../Button";
import Input from "../Form/Input";

const CountryInput = styled.div`
  display: flex;
  position: relative;

  * {
    white-space: nowrap;
  }
`;

const Dropdown = styled.div<{showDropdown: boolean}>`
margin-top: 0.2rem;
position: relative;

ul {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 1rem;
  display: ${({ showDropdown }) => (showDropdown ? "block" : "none")};
  margin: 0;
  max-height: 30rem;
  max-width: 22rem;
  overflow-x: hidden;
  overflow-y: scroll;
  padding: 0;
  position: absolute;
  transition: display 1s ease-out;

  li {
    list-style: none;

    button {
      background: #fff;
      border: 0;
      cursor: pointer;
      display: block;
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

export default ({ onSetPhoneNumber, phoneNumberWithCode }: {onSetPhoneNumber: (phoneNumber: string)=>void; phoneNumberWithCode: string}) => {
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
        <Button variant="Secondary" onClick={() => { toggleShowDropdown(() => !showDropdown); }} style={{ width: "22rem", height: "5rem" }}>
          {selectedCountry ? `${selectedCountry.flag} ${selectedCountry.dial_code}` : "Choose a country" }
          <Icon
            name="arrow"
            style={{ marginLeft: "1rem", transform: showDropdown ? "rotate(0deg)" : "rotate(180deg)", transition: "transform 100ms ease-in" }}
          />
        </Button>
        <ul>
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
};
