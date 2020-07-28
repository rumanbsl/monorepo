import styled from "styled-components";
import Div, { DivProps } from "../Div";

const DividerBase = styled(Div)<DivProps>`
  align-items: baseline;
  display: flex;
  width: inherit;

  .title {
    color: ${({ theme }) => theme.colors.primary};
    margin-right: 1rem;
  }

  .divider {
    background: ${({ theme }) => theme.colors.primary};
    flex: 1;
    height: 1rem;
  }
`;

interface DividerProps extends DivProps{
  title: string;
}

const Divider = ({ title, ...rest }: DividerProps) => (
  // @ts-expect-error
  <DividerBase {...rest}>
    {title && <div className="title">{title}</div>}
    <div className="divider" />
  </DividerBase>
);

export default Divider;
