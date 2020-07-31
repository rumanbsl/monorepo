import { ButtonHTMLAttributes } from "react";
import styled from "styled-components";
import Button, { ButtonProps } from "@/components/Button";
import Icon from "@/components/Icon";

const ButtonComponent = styled(Button)`
  svg {
    fill: #3b5998;
    height: 24px;
    transition: fill 100ms ease-in;
    width: 24px;
  }

  &:hover svg {
    fill: #738abb;
  }
`;

type FacebookLoginComponentProps = ButtonProps & ButtonHTMLAttributes<any>;

const FacebookLoginComponent:React.SFC<Omit<FacebookLoginComponentProps, "children">> = (props) => (
  <ButtonComponent variant="outline" {...props}>
    <Icon name="facebook" />
    facebook
  </ButtonComponent>
);

export default FacebookLoginComponent;
