import React, { useState, useEffect } from "react";
import styled from "styled-components";

import unsplash from "../api/unsplash";
import Header from "./Header";
import GameBoard from "./GameBoard";

function App() {
  const [searchTerm, setSearchTerm] = useState("south africa");
  const [images, setImages] = useState([]);
  const [randomisedImages, setRandomisedImages] = useState([]);

  const [firstSelectedTile, setFirstSelectedTile] = useState(null);
  const [secondSelectedTile, setSecondSelectedTile] = useState(null);
  const [matchedTiles, setMatchedTiles] = useState([]);
  const [endOfTurn, setEndOfTurn] = useState(false);

  const [score, setScore] = useState(0);
  const [minutes, setMinutes] = useState(3);
  const [seconds, setSeconds] = useState(0);
  const [difficulty, setDifficulty] = useState(10);

  useEffect(() => {
    randomiseImagesWithID(images);
  }, [images]);

  useEffect(() => {
    getImages();
  }, [searchTerm]);

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  const getImages = async () => {
    const response = await unsplash.get("/search/photos", {
      params: { query: searchTerm, per_page: difficulty },
    });
    setImages(response.data.results);
  };

  const generateTileId = () => {
    return "tile_id_" + Math.random().toString().substr(2, 8);
  };

  const randomiseImagesWithID = (images) => {
    let duplicateImagesArray = [...images, ...images];
    var m = duplicateImagesArray.length,
      t,
      i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = duplicateImagesArray[m];
      duplicateImagesArray[m] = duplicateImagesArray[i];
      duplicateImagesArray[i] = t;
    }

    let finalArray = [];
    for (let image of duplicateImagesArray) {
      finalArray.push({
        ...image,
        tileId: generateTileId(),
      });
    }
    setRandomisedImages([...finalArray]);
  };

  const onTileClick = (tileId, id) => {
    // is the tile already paired && is the tile selected && is it the end of the turn?
    if (
      !matchedTiles.includes(id) &&
      tileId !== firstSelectedTile &&
      !endOfTurn
    ) {
      // find image id for first selcted id for comparrison
      const firstSelctedTileId = randomisedImages.find(
        (image) => image.tileId === firstSelectedTile
      )?.id;
      // if there is no selected tile set first selected tile
      if (!firstSelectedTile) {
        setFirstSelectedTile(tileId);
      } else {
        // if the second tile matches the first tile set matched tiles to include
        if (id === firstSelctedTileId) {
          setMatchedTiles([...matchedTiles, id]);
          // add points to score
          setScore(score + 6);
          // reset selected tiles
          setFirstSelectedTile(null);
        } else {
          // deduct points from score
          setScore(score - 2);
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

  const onResetClick = () => {
    randomiseImagesWithID(images);
    setFirstSelectedTile(null);
    setSecondSelectedTile(null);
    setMatchedTiles([]);
    setScore(0);
    setEndOfTurn(false);
  };

  return (
    <div>
      <Container>
        <Header
          onResetClick={onResetClick}
          score={score}
          seconds={seconds}
          minutes={minutes}
        />
        <Main>
          <GameBoard
            images={randomisedImages}
            onTileClick={onTileClick}
            firstSelectedTile={firstSelectedTile}
            secondSelectedTile={secondSelectedTile}
            matchedTiles={matchedTiles}
          />
        </Main>
      </Container>
    </div>
  );
}

export default App;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-rows: 7rem;
`;

const Main = styled.div`
  display: grid;
  grid-template-columns: auto;
`;
