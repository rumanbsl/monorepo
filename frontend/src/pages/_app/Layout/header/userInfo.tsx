import styled from "styled-components";
import Icon from "@/components/Icon";

const Button = styled.button`
  align-items: center;
  background: #000;
  border: 0;
  border-radius: 50%;
  color: #fff;
  display: flex;
  height: 3.2rem;
  justify-content: center;
  width: 3.2rem;
`;

const UserInfo = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 13rem;
`;

export default function UserInfoComponent() {
  return (
    <UserInfo>
      <Icon name="heart" style={{ fill: "none" }} />
      <Button>0</Button>
      <span>US</span>
    </UserInfo>
  );
}
