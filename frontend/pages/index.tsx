import Provider from "utils/Provider";
import Icon from "../components/Icon";

const Component = () => (
  <div>
    Hello!!
    <Icon name="heart" width={10} />
  </div>
);

export default function Index() {
  return (
    <Provider>
      <Component />
    </Provider>
  );
}
