import Link from "next/link";
import { NextRouter } from "next/router";
import styled from "styled-components";
import Routes from "@/utils/Routes";

interface NavigationProps {
  router: NextRouter;
  onLogout: () => void;
}

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

export default function NavigationComponent({ router, onLogout }: NavigationProps) {
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
      <button type="button" onClick={onLogout}>logout</button>
    </Navigation>
  );
}
