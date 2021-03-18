import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Tile from "./Tile";

function GameBoard({ images }) {
  const [selectedTiles, setSelectedTiles] = useState([]);
  const [matchedTiles, setMatchedTiles] = useState([]);

  useEffect(() => {
    selectedTiles.length === 2 &&
      (selectedTiles[0].description === selectedTiles[1].description
        ? matchingTiles(selectedTiles)
        : unmatchTiles());
  }, [selectedTiles]);

  const matchingTiles = (selectedTiles) => {
    setMatchedTiles([selectedTiles[0].description, ...matchedTiles]);
    setTimeout(() => {
      setSelectedTiles([]);
    }, 2000);
  };

  const unmatchTiles = () => {
    setSelectedTiles([]);
  };

  const onTileClick = ({ target }) => {
    setSelectedTiles([
      { id: target.id, description: target.alt },
      ...selectedTiles,
    ]);
    console.log(`selected tiles are ${selectedTiles}`);
  };

  return (
    <TileContainer>
      {images.length > 1 &&
        images.map(({ description, urls }, index) => (
          <Tile
            key={index}
            id={index}
            alt={description}
            src={urls.regular}
            onTileClick={onTileClick}
            selectedTiles={selectedTiles}
            matchedTiles={matchedTiles}
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
