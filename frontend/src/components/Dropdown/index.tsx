import PopperBase from "../PopperBase";

interface DropdownProps<T extends {label: string} & Record<string, unknown>> {
  items: T[];
  // multiple?: boolean;
  // onSelectItem: DropdownProps<T>["multiple"] extends true ? T[] : T
}

function Dropdown <T extends {label: string} & Record<string, unknown>>({ items }: DropdownProps<T>) {
  const activator = <button type="button">hello</button>;
  const component = (
    <ul>
      {
        items.map((item) => (
          <li>{item.label}</li>
        ))
      }
    </ul>
  );
  return (
    <PopperBase
      activeOn="click"
      activator={activator}
      component={component}
    />
  );
}

const dd = () => (
  <Dropdown items={[{ label: "noni", value: "1234" }]} />
);

export default Dropdown;
