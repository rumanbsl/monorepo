import Button from "@/components/Button";
import Icon from "@/components/Icon";
import styled from "styled-components";

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

export default function FacebookLoginComponent() {
  return (
    <ButtonComponent variant="outline_invert">
      <Icon name="facebook" />
      facebook
    </ButtonComponent>
  );
}
