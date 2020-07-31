import { InputHTMLAttributes } from "react";
import styled from "styled-components";
import Icon, { IconName } from "@/components/Icon";

const Input = styled.div<{labelInline: boolean, width: string}>`
  flex: 1;

  > div {
    align-items: ${({ labelInline }) => (labelInline ? "center" : "start")};
    display: inline-flex;
    flex-direction: ${({ labelInline }) => (labelInline ? "row" : "column")};
    position: relative;
    width: ${({ width }) => width};

    .icon {
      position: absolute;
      right: 1.2rem;
      top: 1.5rem;

      @media screen and (max-width: 300px) {
        display: none;
      }
    }

    label {
      margin: ${({ labelInline }) => (labelInline ? "0 1rem 0 0" : "0 0 1rem 0")};
    }

    input {
      background: #f9f9f9;
      border: 0;
      border-radius: 1.2rem;
      color: #75736b;

      font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
      height: 5.2rem;
      letter-spacing: -0.05rem;
      padding: 1.2rem 5.5rem 1.2rem 1.2rem;
      transition: border 50ms ease-in-out;
      width: inherit;

      @media screen and (max-width: 300px) {
        padding: 1.2rem;
      }

      &::placeholder {
        color: #909090;
      }

      &:focus {
        border: ${({ theme }) => `0.2rem solid ${theme.colors.primary}`};
        outline: none;
        width: calc(100% - 0.2rem);
      }
    }
  }
`;

type InputType = "button" | "checkbox" |
"color" |
"date" |
"datetime" |
"email" |
"file" |
"hidden" |
"image" |
"month" |
"number" |
"password" |
"radio" |
"range" |
"reset" |
"search" |
"submit" |
"tel" |
"text" |
"time" |
"url" |
"week";

interface PropTypes<T> extends InputHTMLAttributes<HTMLInputElement> {
  icon: IconName;
  type: InputType;
  value: T extends ("number") ? number : string;
  width: number|string;
  label: string;
  labelInline: boolean
}

export default function InputComponent<T>(prop: Partial<PropTypes<T>>) {
  const { width, label, placeholder, value, onChange, icon, labelInline, type, ...rest } = prop;
  const Width = (() => {
    if (typeof width === "number") {
      return `${width}px`;
    } if ((typeof width === "string" && ["px", "rem", "em", "%", "pt"].some((unit) => (width).endsWith(unit)))) {
      return width;
    }
    return "100%";
  })();

  return (
    <Input labelInline={!!labelInline} {...rest} width={Width}>
      <div>
        { label ? <label htmlFor="input-component" style={{ marginLeft: "4px" }}>{label}</label> : null}
        <input
          type={type || "text"}
          placeholder={placeholder || ""}
          value={typeof value === "number" ? value : value || ""}
          onChange={onChange}
          id="input-component"
        />
        { icon && <Icon name={icon} className="icon" /> }
      </div>
    </Input>
  );
}
