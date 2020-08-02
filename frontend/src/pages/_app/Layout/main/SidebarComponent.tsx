import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Sidebar from "react-sidebar";
import styled from "styled-components";
import Icon from "@/components/Icon";
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

const NavigationComponent = () => {
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

const IconComponent = styled(Icon)`
  cursor: pointer;
  fill: ${({ theme }) => theme.colors.primary};
  height: 2.5rem;
  margin: 2rem 0 0 2rem;
  width: 2.5rem;
`;

const SidebarComponent:React.SFC<{viewport: ViewPortShape}> = ({ viewport }) => {
  const [isSidebarOpen, toggleSidebarVisibility] = useState(false);
  return viewport.width <= 800 ? (
    <Sidebar
      sidebar={<NavigationComponent />}
      open={isSidebarOpen}
      onSetOpen={() => toggleSidebarVisibility(() => !isSidebarOpen)}
      styles={{ sidebar: { background: "white", padding: "2rem" } }}
    >
      <IconComponent name="menu" onClick={() => toggleSidebarVisibility(() => !isSidebarOpen)} />
    </Sidebar>
  ) : <NavigationComponent />;
};
export default SidebarComponent;
