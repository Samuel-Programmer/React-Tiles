import React from "react";
import styled from "styled-components";

function TimeDisplay({ minutes, seconds }) {
  return (
    <ButtonContainer>
      {seconds < 10 ? `${minutes}:0${seconds}` : `${minutes}:${seconds}`}
    </ButtonContainer>
  );
}

export default TimeDisplay;

const ButtonContainer = styled.div`
  height: 6rem;
  width: 6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid;
  border-radius: 10%;
  margin: 0.5rem;
  cursor: pointer;

  :hover {
    transform: scale(1.1);
    border: 2px solid white;
    border-radius: 10%;
  }
`;
