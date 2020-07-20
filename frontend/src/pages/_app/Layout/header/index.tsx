import styled from "styled-components";
import UserInfo from "./userInfo";

const Header = styled.div`
  align-items: center;
  background: #fff;
  display: flex;
  height: 140px;
  justify-content: space-between;

  @media screen and (max-width: 1110px) {
    padding: 1.6rem;
  }

  > * {
    margin: 0;
    padding: 0;
  }
`;

const Logo = styled.h1`
  display: inline-block;
  font-size: 4.2rem;
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
  letter-spacing: -0.4rem;

  > a {
    color: inherit;
    text-decoration: none;
  }
`;

export default function HeaderComponent() {
  return (
    <Header>
      <Logo><a href="/">N-Uber</a></Logo>
      <UserInfo />
    </Header>
  );
}
