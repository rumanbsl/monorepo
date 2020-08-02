/* eslint-disable react-hooks/rules-of-hooks */

import { MutationUpdaterFn, useMutation } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Sidebar from "react-sidebar";
import styled from "styled-components";
import { USER_GET, USER_TOGGLE_DRIVING_MODE } from "@/Interfaces/gql-definitions";
import cache from "@/cache";
import Icon from "@/components/Icon";
import serverOnly from "@/resolvers/serverOnly";
import Routes from "@/utils/Routes";
import { ViewPortShape } from "@/utils/useWindowSize";

const Navigation = styled.nav`
  display: flex;
  flex-direction: column;
  row-gap: 1.6rem;
  width: 22.2rem;

  > * {
    align-items: center;
    background: #f8f8f8;
    border-radius: 1.3rem;
    color: inherit;
    display: inline-flex;
    font-size: 1.4rem;
    font-style: italic;
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    height: 7.7rem;
    letter-spacing: -0.8px;
    padding: 1.8rem 2.6rem;
    text-decoration: none;
    text-transform: uppercase;
    transition: transform 100ms ease-in, background 100ms ease-in;

    &:hover,
    &:focus {
      transform: scale(1.05);
    }

    &.active {
      background: #a38de3;
      color: #fde0ff;
    }

    &.home {
      height: 4.6rem;
    }
  }

  > button {
    border: 0;
    cursor: pointer;
  }
`;

const NavigationComponent:React.SFC = () => {
  const router = useRouter();

  const className = (route: typeof Routes[number]) => {
    const returnable: string[] = [];
    if (route.path === "/") returnable.push("home");
    if (router.pathname === route.path) returnable.push("active");
    return returnable.join(" ");
  };
  return (
    <Navigation>
      {Routes.filter((route) => route.navItem).map((route, i) => (
        <Link href={route.path} key={i}>
          <a className={className(route)}>{route.path === "/" ? "home" : route.path.substring(1)}</a>
        </Link>
      ))}
    </Navigation>
  );
};

const Menu = styled(Icon)`
  cursor: pointer;
  fill: ${({ theme }) => theme.colors.primary};
  height: 2.5rem;
  margin: 2rem 0 0 2rem;
  width: 2.5rem;
`;
const DriverIcon = styled(Icon)<{isDriving: number}>`
  cursor: pointer;
  fill: ${({ theme, isDriving }) => (isDriving ? theme.colors.primary : theme.colors.error)};
  height: 4.5rem;
  width: 4.5rem;
`;

const SidebarComponent:React.SFC<{viewport: ViewPortShape}> = ({ viewport }) => {
  const query = serverOnly.Query.USER_GET;
  const [isSidebarOpen, toggleSidebarVisibility] = useState(false);

  const [toggleDriving] = useMutation<USER_TOGGLE_DRIVING_MODE>(serverOnly.Mutation.USER_TOGGLE_DRIVING_MODE);
  let userInfo = cache.readQuery<USER_GET>({ query });

  const onToggleDrivingMode:MutationUpdaterFn<USER_TOGGLE_DRIVING_MODE> = async (_, { data }) => {
    userInfo = cache.readQuery<USER_GET>({ query });
    cache.writeQuery({
      query,
      data: { USER_GET: { ...userInfo?.USER_GET || {}, isDriving: !!data?.USER_TOGGLE_DRIVING_MODE } },
    });
  };

  return viewport.width <= 800 ? (
    <Sidebar
      sidebar={(
        <>
          <NavigationComponent />
          <DriverIcon
            name="wheel"
            isDriving={userInfo?.USER_GET?.isDriving ? 1 : 0}
            onClick={async () => { await toggleDriving({ update: onToggleDrivingMode }); }}
          />
        </>
      )}
      open={isSidebarOpen}
      onSetOpen={() => toggleSidebarVisibility(() => !isSidebarOpen)}
      styles={{ sidebar: { background: "white", padding: "2rem" } }}
    >
      <Menu name="menu" onClick={() => toggleSidebarVisibility(() => !isSidebarOpen)} />
    </Sidebar>
  ) : <NavigationComponent />;
};
export default SidebarComponent;
