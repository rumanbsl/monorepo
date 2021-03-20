/* eslint-disable react-hooks/rules-of-hooks */

import { useMutation, MutationUpdaterFn, useQuery } from "@apollo/client";
import styled from "styled-components";
import { USER_GET, USER_TOGGLE_DRIVING_MODE } from "@/Interfaces/gql-definitions";
import FileUploader from "@/components/FileUploader";
import Icon from "@/components/Icon";
import clientOnly from "@/resolvers/clientOnly";
import serverOnly from "@/resolvers/serverOnly";

const DriverIcon = styled(Icon)<{driving: number}>`
  cursor: pointer;
  fill: ${({ theme, driving }) => (driving ? theme.colors.primary : theme.colors.error)};
  height: 26px;
  width: 26px;
`;

const UserInfo = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 13rem;
`;

const ProfilePic = styled.img`
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

export default function UserInfoComponent() {
  const query = serverOnly.Query.USER_GET;
  const { data: clientResolver } = useQuery<{isLoggedIn: boolean}>(clientOnly.Query.IS_LOGGED_IN);
  const { data: userInfo } = useQuery<USER_GET>(query, { skip: !clientResolver?.isLoggedIn });
  const onToggleDrivingMode:MutationUpdaterFn<USER_TOGGLE_DRIVING_MODE> = async (localCache, { data }) => {
    if (typeof data?.USER_TOGGLE_DRIVING_MODE === "boolean" && userInfo) {
      localCache.writeQuery({
        query,
        data: { USER_GET: { ...userInfo.USER_GET, isDriving: data.USER_TOGGLE_DRIVING_MODE } },
      });
    }
  };

  const [toggleDriving] = useMutation<USER_TOGGLE_DRIVING_MODE>(serverOnly.Mutation.USER_TOGGLE_DRIVING_MODE);
  return (
    <UserInfo>
      <DriverIcon name="wheel" driving={userInfo?.USER_GET?.isDriving ? 1 : 0} onClick={() => toggleDriving({ update: onToggleDrivingMode })} />
      <FileUploader accept="image/*" onUpload={(e) => { console.log(e); }}>
        {userInfo?.USER_GET?.profilePhoto && <ProfilePic src={userInfo.USER_GET.profilePhoto} alt="" />}
      </FileUploader>
      <span>US</span>
    </UserInfo>
  );
}
