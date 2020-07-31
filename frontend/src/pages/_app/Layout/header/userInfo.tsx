import styled from "styled-components";
import cache from "@/cache";
import Icon from "@/components/Icon";
import serverOnly from "@/resolvers/serverOnly";

const ProfilePic = styled.button<{image?: string}>`
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
  // if (typeof window !== undefined) {
  //   const userInfo = cache.readQuery({ query: serverOnly.Query.USER_GET });
  //   console.log(userInfo);
  // }
  return (
    <UserInfo>
      <Icon name="heart" width={24} height={24} />
      <ProfilePic>0</ProfilePic>
      <span>US</span>
    </UserInfo>
  );
}
