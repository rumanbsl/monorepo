import { darken } from "polished";
import styled from "styled-components";
import PopperBase from "../PopperBase";

const List = styled.ul`
  margin: 0;
  padding: 0;

  li {
    font-size: 2rem;
    list-style: none;

    > button {
      background: inherit;
      border: 0;
      border-bottom: ${({ theme }) => `0.2rem solid ${darken(0.2, theme.colors.primary_invert)}`};
      color: inherit;
      height: inherit;
      margin: 0;
      padding: 0;
      transition: border 200ms ease-out;
      width: inherit;

      &:hover {
        border-bottom: ${({ theme }) => `0.2rem solid ${theme.colors.primary_invert}`};
        cursor: pointer;
      }
    }

    &:not(:last-child) {
      margin-bottom: 0.2rem;
    }
  }
`;

interface RequiredDropdownItems {label: string; _id: string}
interface DropdownProps<T extends RequiredDropdownItems & Record<string, unknown>> {
  items: T[];
  multiple?: boolean;
  onSelectItem: (returnable: T[]|T)=>void
}

function handleClick<T extends RequiredDropdownItems & Record<string, unknown>>(
  props: {
    items: T[],
    selectedItem: T,
    multiple: boolean
  },
) {
  const { multiple, selectedItem, items } = props;
  if (!multiple) {
    return [selectedItem];
  }
  const foundIdx = items.findIndex((item) => item._id === selectedItem._id);
  if (foundIdx === -1) {
    return items.concat(selectedItem);
  }
  items.splice(foundIdx, 1);
  return items;
}

function Dropdown <T extends RequiredDropdownItems & Record<string, unknown>>({ items, multiple = false, onSelectItem }: DropdownProps<T>) {
  const activator = <button type="button">hello</button>;
  let selectedItems: T[] = [];

  const component = (
    <List>
      {
        items.map((item) => (
          <li key={item._id}>
            <button
              type="button"
              onClick={() => {
                selectedItems = handleClick<T>({
                  multiple,
                  selectedItem : item,
                  items        : selectedItems,
                });
                return multiple ? onSelectItem(selectedItems) : onSelectItem(selectedItems[0]);
              }}
            >
              {item.label}
            </button>
          </li>
        ))
      }
    </List>
  );
  return (
    <PopperBase
      componentHideOnClick={!multiple}
      activeOn="click"
      activator={activator}
      component={component}
    />
  );
}

// const dd = () => (
//   <Dropdown items={[{ label: "noni", value: "1234", _id: 1 }]} onSelectItem={console.log} />
// );

export default Dropdown;
