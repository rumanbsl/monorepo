import { useQuery } from "@apollo/client";
import styled from "styled-components";
import { UserGet_USER_GET } from "@/Interfaces/gql-definitions";
import cache from "@/cache";
import Icon from "@/components/Icon";
import clientOnly from "@/resolvers/clientOnly";
import serverOnly from "@/resolvers/serverOnly";

const ProfilePic = styled.div`
  img {
    align-items: center;
    background: #000;
    border: 0;
    border-radius: 50%;
    color: #fff;
    display: flex;
    height: 3.2rem;
    justify-content: center;
    width: 3.2rem;
  }
`;

const UserInfo = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 13rem;
`;

export default function UserInfoComponent() {
  const user = cache.readQuery<{isLoggedIn: boolean}>({ query: clientOnly.Query.IS_LOGGED_IN });
  if (!user?.isLoggedIn) return null;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data } = useQuery<{USER_GET: UserGet_USER_GET}>(serverOnly.Query.USER_GET);
  if (!data) return null;
  return (
    <UserInfo>
      <Icon name="heart" width={24} height={24} />
      <ProfilePic>
        {data.USER_GET.profilePhoto && <img src={data.USER_GET.profilePhoto} alt="" />}
      </ProfilePic>
      <span>US</span>
    </UserInfo>
  );
}
