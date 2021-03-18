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
    randomiseImages(images);
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

  const randomiseImages = (images) => {
    images = [...images, ...images];
    var m = images.length,
      t,
      i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = images[m];
      images[m] = images[i];
      images[i] = t;
    }
    setRandomisedImages([...images]);
  };
  return (
    <div>
      <Container>
        <Header />
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
