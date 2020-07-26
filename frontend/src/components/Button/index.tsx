import styled from "styled-components";

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

interface Props extends React.ButtonHTMLAttributes<unknown> {
  variant?: "Primary" | "Secondary" | "Tertiary" | "Danger";
}

export default function ButtonComponent(props: Props) {
  const { children, variant = "Primary", ...rest } = props;
  return (
    <Button {...rest} className={variant.toLowerCase()}>
      {children}
    </Button>
  );
}
