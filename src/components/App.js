import React, { useState, useEffect } from "react";
import styled from "styled-components";

import unsplash from "../api/unsplash";
import Header from "./Header";
import GameBoard from "./GameBoard";

function App() {
  const [searchTerm, setSearchTerm] = useState("south africa");
  const [images, setImages] = useState([]);
  const [randomisedImages, setRandomisedImages] = useState([]);

  useEffect(() => {
    randomiseImagesWithID(images);
  }, [images]);

  useEffect(() => {
    getImages();
  }, [searchTerm]);

  const getImages = async () => {
    const response = await unsplash.get("/search/photos", {
      params: { query: searchTerm },
    });
    setImages(response.data.results);
  };

  const generateTileId = () => {
    return "tile_id_" + Math.random().toString().substr(2, 8);
  };

  const randomiseImagesWithID = (images) => {
    let randomisedImages = [...images, ...images];
    var m = images.length,
      t,
      i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = randomisedImages[m];
      randomisedImages[m] = randomisedImages[i];
      randomisedImages[i] = t;
    }

    let finalArray = [];
    for (let image of randomisedImages) {
      finalArray.push({
        ...image,
        tileId: generateTileId(),
      });
    }
    setRandomisedImages([...finalArray]);
  };

  const onResetClick = () => {
    randomiseImagesWithID(images);
    console.log("Ive been reset");
  };

  return (
    <div>
      <Container>
        <Header onResetClick={onResetClick} />
        <Main>
          <GameBoard images={randomisedImages} />
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
