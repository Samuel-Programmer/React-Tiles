import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Tile from "./Tile";

function GameBoard({ images }) {
  const [firstSelectedTile, setFirstSelectedTile] = useState(null);
  const [secondSelectedTile, setSecondSelectedTile] = useState(null);
  const [matchedTiles, setMatchedTiles] = useState([]);
  const [endOfTurn, setEndOfTurn] = useState(false);

  useEffect(() => {
    if (matchedTiles.length > 0 && matchedTiles.length === images.length / 2) {
      alert("YOU WON!");
    }
  }, [matchedTiles]);

  const onTileClick = (tileId, id) => {
    // is the tile already paired && is the tile selected && is it the end of the turn?
    if (
      !matchedTiles.includes(id) &&
      tileId !== firstSelectedTile &&
      !endOfTurn
    ) {
      // find image id for first selcted id for comparrison
      const firstSelctedTileId = images.find(
        (image) => image.tileId === firstSelectedTile
      )?.id;

      // if there is no selected tile set first selected tile
      if (!firstSelectedTile) {
        setFirstSelectedTile(tileId);
      } else {
        // if the tile matches the first set matched tiles to include
        if (id === firstSelctedTileId) {
          setMatchedTiles([...matchedTiles, id]);
          // reset selected tiles
          setFirstSelectedTile(null);
        } else {
          // set and display second tile choice
          setSecondSelectedTile(tileId);
          // set end of turn so tiles cannot be continued to be selected
          setEndOfTurn(true);
          // reset all values after a few seconds
          setTimeout(() => {
            setFirstSelectedTile(null);
            setSecondSelectedTile(null);
            setEndOfTurn(false);
          }, 1500);
        }
      }
    }
  };

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
