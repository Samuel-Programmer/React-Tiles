import React from "react";
import tile from "./tile.jpeg";
import styled from "styled-components";

function Tile({ id, alt, src, onTileClick, tileId, isFlipped }) {
  return (
    <Imgcontainer onClick={() => onTileClick(tileId, id)}>
      <img alt={alt} src={isFlipped ? src : tile} id={id} />
    </Imgcontainer>
  );
}

export default Tile;

const Imgcontainer = styled.div`
  height: 10rem;
  width: 10rem;
  margin: 1rem;
  border: 2px solid white;
  border-radius: 10%;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    border-radius: 10%;
  }
  img:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 15px #dcfffe;
    border: 2px solid white;
    border-radius: 10%;
  }
`;
