import { Awesome } from "common";
import Icon from "../components/Icon";

const a:Awesome = { hello: "HI" };

const Component = () => (
  <div>
    Noni
    <Icon name="heart" width={10} />
  </div>
);

export default function Index() {
  console.log(a);
  return (
    <Component />
  );
}
