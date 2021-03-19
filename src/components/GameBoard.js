import React, { useEffect } from "react";
import styled from "styled-components";

import Tile from "./Tile";

function GameBoard({
  images,
  firstSelectedTile,
  secondSelectedTile,
  matchedTiles,
  onTileClick,
}) {
  useEffect(() => {
    if (matchedTiles.length > 0 && matchedTiles.length === images.length / 2) {
      alert("YOU WON!");
    }
  }, [matchedTiles]);

  return (
    <TileContainer>
      {images.length > 1 &&
        images.map(({ description, urls, id, tileId }, index) => (
          <Tile
            key={index}
            id={id}
            tileId={tileId}
            alt={description}
            src={urls.regular}
            onTileClick={onTileClick}
            isFlipped={
              firstSelectedTile === tileId ||
              secondSelectedTile === tileId ||
              matchedTiles.includes(id)
            }
          />
        ))}
    </TileContainer>
  );
}

export default GameBoard;

const TileContainer = styled.div`
  background: black;
  padding: 7rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
`;
