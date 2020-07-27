import styled from "styled-components";
import Icon, { IconName } from "@/components/Icon";
import { InputHTMLAttributes } from "react";

const Input = styled.div<{labelInline: boolean}>`
  flex: 1;

  > div {
    align-items: ${({ labelInline }) => (labelInline ? "center" : "start")};
    display: inline-flex;
    flex-direction: ${({ labelInline }) => (labelInline ? "row" : "column")};
    position: relative;

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
      display: inherit;

      font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
      height: 5.2rem;
      letter-spacing: -0.05rem;
      padding: 1.2rem 5.5rem 1.2rem 1.2rem;
      transition: border 50ms ease-in-out;
      width: 100%;

      @media screen and (max-width: 300px) {
        padding: 1.2rem;
      }

      &::placeholder {
        color: #909090;
      }

      /* &:focus {
        border: 1px solid #909090;
        width: calc(100% + 1px);
      } */
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
  const width = (() => {
    if (typeof prop.width === "number") {
      return `${prop.width}px`;
    } if ((typeof prop.width === "string" && ["px", "rem", "em", "%", "pt"].some((unit) => (prop.width as string).endsWith(unit)))) {
      return prop.width;
    }
    return "40rem";
  })();

  return (
    <Input labelInline={!!prop.labelInline}>
      <div>
        { prop.label ? <label htmlFor="input-component">{prop.label}</label> : null}
        <input
          style={{ width }}
          type={prop.type || "text"}
          placeholder={prop.placeholder || ""}
          value={typeof prop.value === "number" ? prop.value : prop.value || ""}
          onChange={prop.onChange}
          id="input-component"
        />
        { prop.icon && <Icon name={prop.icon} className="icon" /> }
      </div>
    </Input>
  );
}
