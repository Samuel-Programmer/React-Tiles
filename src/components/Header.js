import React from "react";
import styled from "styled-components";

import HeaderDetail from "./HeaderDetail";
import ResetButton from "./ResetButton";
import TimeDisplay from "./TimeDisplay";

function Header({ onResetClick, score, seconds, minutes }) {
  return (
    <div>
      <Container>
        <HeaderDetail title={score} />
        <ResetButton onResetClick={onResetClick} title={"Reset"} />
        <Title>Tiles</Title>
        <TimeDisplay seconds={seconds} minutes={minutes} />
        <HeaderDetail title={"Difficulty"} />
      </Container>
    </div>
  );
}

export default Header;

const Container = styled.div`
  background: grey;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Title = styled.div`
  color: white;
  font-size: 4.5rem;
  font-family: "Merienda One", cursive;
  cursor: default;
`;
