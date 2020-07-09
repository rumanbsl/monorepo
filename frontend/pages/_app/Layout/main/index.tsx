import styled from "styled-components";
import ProgressBar from "nprogress";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import Routes from "utils/Routes";

Router.events.on("routeChangeStart", () => { ProgressBar.start(); });
Router.events.on("routeChangeComplete", () => { ProgressBar.done(); });
Router.events.on("routeChangeError", () => { ProgressBar.done(); });

const Main = styled.div`
  column-gap: 5.7rem;
  display: flex;
  margin-top: 5.4rem;
  min-height: calc(100vh - 514px);

  @media screen and (max-width: 1110px) {
    padding: 1.6rem;
  }
`;

const Navigation = styled.nav`
  display: flex;
  flex-direction: column;
  row-gap: 1.6rem;
  width: 22.2rem;

  a {
    align-items: center;
    background: #f8f8f8;
    border-radius: 1.3rem;
    color: inherit;
    display: inline-flex;
    font-size: 1.4rem;
    font-style: italic;
    font-weight: ${({ theme }) => theme.fontWeight.bold};
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
`;

export default function MainComponent({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const className = (route: typeof Routes[number]) => {
    const returnable: string[] = [];
    if (route === "/") returnable.push("home");
    if (router.pathname === route) returnable.push("active");
    return returnable.join(" ");
  };
  return (
    <Main>
      <Navigation>
        {Routes.map((route, i) => (
          <Link href={route} key={i}>
            <a className={className(route)}>{route === "/" ? "home" : route.substring(1)}</a>
          </Link>
        ))}
      </Navigation>
      {children}
    </Main>
  );
}
