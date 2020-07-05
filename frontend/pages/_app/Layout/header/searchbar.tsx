import styled from "styled-components";
import Icon from "components/Icon";

const SearchBar = styled.div`
  flex: 1;
  text-align: center;

  > div {
    position: relative;

    .searchIcon {
      position: absolute;
      right: 25%;
      top: 1.5rem;

      @media screen and (max-width: 780px) {
        display: none;
      }
    }

    input[type=text] {
      background: #f9f9f9;
      border: 0;
      border-radius: 1.2rem;
      color: #75736b;
      display: inline-block;
      font-size: 12px;
      font-weight: ${({ theme }) => theme.fontWeight.regular};
      height: 5.2rem;
      letter-spacing: -0.05rem;
      min-width: 27.8rem;
      padding: 1.2rem 5rem 1.2rem 1.2rem;
      transition: border 50ms ease-in-out;
      width: 55%;

      @media screen and (max-width: 780px) {
        padding: 1.2rem;
      }

      &::placeholder {
        color: #909090;
      }

      &:focus {
        border: 1px solid #909090;
        width: calc(55% + 1px);
      }
    }
  }
`;

export default function SearchBarComponent(prop: {onChange: (str: string) => void; value: string }) {
  return (
    <SearchBar>
      <div>
        <input type="text" placeholder="Search for items, brands and inspiration" value={prop.value || ""} onChange={(e) => prop.onChange(e.target.value)} />
        <Icon name="search" className="searchIcon" />
      </div>
    </SearchBar>
  );
}
