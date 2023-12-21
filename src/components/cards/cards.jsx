// import { useState } from "react";
import Card from "../card/card.jsx";
import "../../styles/cards.css";
import useFetch from "../../adapters/useFetch.jsx";

const Cards = () => {
  const data = useFetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${
      import.meta.env.VITE_API_KEY
    }&language=pt-BR&page=1`
  );
  return (
    <>
      <div className="cards">
        {data.map((item, index) => (
          <Card movie={item} key={index} />
        ))}
      </div>
    </>
  );
};

export default Cards;
