import styled from "styled-components";
import Icon, { IconName } from "@/components/Icon";
import { InputHTMLAttributes } from "react";

const Input = styled.div`
  flex: 1;

  > div {
    display: inline-block;
    position: relative;

    .icon {
      position: absolute;
      right: 1.2rem;
      top: 1.5rem;

      @media screen and (max-width: 300px) {
        display: none;
      }
    }

    input {
      background: #f9f9f9;
      border: 0;
      border-radius: 1.2rem;
      color: #75736b;
      display: inherit;
      font-size: 12px;
      font-weight: ${({ theme }) => theme.fontWeight.regular};
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

      &:focus {
        border: 1px solid #909090;
        width: calc(100% + 1px);
      }
    }
  }
`;

interface PropTypes<T=string> {
  icon: IconName;
  onChange: InputHTMLAttributes<HTMLInputElement>["onChange"];
  placeholder: string;
  type: "button" | "checkbox" |
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
  value: T extends ("email" | "text") ? string : number;
  width: number|string;
}

export default (prop: Partial<PropTypes>) => {
  const width = (() => {
    if (typeof prop.width === "number") {
      return `${prop.width}px`;
    } if ((typeof prop.width === "string" && ["px", "rem", "em", "%", "pt"].some((unit) => (prop.width as string).endsWith(unit)))) {
      return prop.width;
    }
    return "40rem";
  })();
  return (
    <Input>
      <div>
        <input
          style={{ width }}
          type={prop.type || "text"}
          placeholder={prop.placeholder || ""}
          value={prop.value || ""}
          onChange={prop.onChange}
        />
        { prop.icon && <Icon name={prop.icon} className="icon" /> }
      </div>
    </Input>
  );
};
