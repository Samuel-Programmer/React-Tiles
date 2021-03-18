import React from "react";
import styled from "styled-components";

function HeaderDetail({ title }) {
  return <Container>{title}</Container>;
}

export default HeaderDetail;

const Container = styled.div`
  height: 6rem;
  width: 6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid;
  border-radius: 10%;
  margin: 0.5rem;
  cursor: pointer;
`;
