import styled from "styled-components";
import { MouseEventHandler } from "react";

const Button = styled.button`
  align-items: center;
  border: 0;
  border-radius: 1.1rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  min-height: 4.2rem;
  min-width: 9.2rem;
  transition: background 200ms ease-in, transform 200ms ease-in;

  &.primary {
    color: #fff;

    &,
    &:active {
      background: #000;
    }

    &:hover,
    &:focus {
      background: rgba(0, 0, 0, 0.8);
      transform: translateY(-0.2rem);
    }
  }
`;

interface Props<ClickArg = any> {
  children: React.ReactNode;
  onClick: MouseEventHandler<ClickArg>;
  variant?: "Primary" | "Secondary" | "Tertiary" | "Danger";
}

export default function ButtonComponent({ children, onClick, variant = "Primary" }: Props) {
  return (
    <Button onClick={onClick} className={variant.toLowerCase()}>
      {children}
    </Button>
  );
}
