import React from "react";
import styled from "styled-components";

import HeaderDetail from "./HeaderDetail";

function Header({ onResetClick }) {
  return (
    <div>
      <Container>
        <HeaderDetail title={"Score"} />
        <HeaderDetail onResetClick={onResetClick} title={"Reset"} />
        <Title>Tiles</Title>
        <HeaderDetail title={"Time"} />
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
