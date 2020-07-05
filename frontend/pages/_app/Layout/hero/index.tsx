import styled from "styled-components";
import Button from "components/Button";

const Hero = styled.div`
  align-items: center;
  background: #ffc8e3;
  border-radius: 36px;

  display: flex;
  flex-direction: column;
  height: 320px;
  justify-content: center;

  h2 {
    text-align: center;
  }
`;

export default function HeroComponent() {
  return (
    <Hero>
      <h2>
        $20 OFF $100 PLUS,
        <br />
        GET FREE NEXT-DAY DELIVERY
      </h2>
      <p>With code: 20100</p>
      {/* eslint-disable-next-line no-console */}
      <Button onClick={() => { console.log("clicked"); }}>OK</Button>
    </Hero>
  );
}
