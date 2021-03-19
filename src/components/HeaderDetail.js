import React from "react";
import styled from "styled-components";

function HeaderDetail({ title, onResetClick }) {
  return <ButtonContainer onClick={onResetClick}>{title}</ButtonContainer>;
}

export default HeaderDetail;

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
    box-shadow: 0 8px 15px #dcfffe;
    border: 2px solid white;
    border-radius: 10%;
  }
`;
