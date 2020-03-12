import RouterLesson from "./Pages/react-router-lesson";
import TylerLesson from "./Pages/tyler-lessons";
import WebRTC from "./Pages/webrtc";

interface RoutesShape {
  exact?: boolean;
  show: boolean;
  component: <T>(prop: T) => JSX.Element;
  path: string;
  title?: string;
}

const Routes: RoutesShape[] = [
  {
    show      : true,
    exact     : true,
    component : RouterLesson,
    path      : "/",
    title     : "Main",
  },
  {
    show      : true,
    exact     : true,
    component : TylerLesson,
    path      : "/tyler-lesson/:id",
    title     : "Tyler",
  },
  {
    show      : true,
    exact     : true,
    component : WebRTC,
    path      : "/webrtc",
    title     : "WebRTC",
  },
];

export default Routes;

/**
 * Prgrammatic navigation
 *  prop.history.push(path)
 * Query string
 *  prop.location.search
 */
