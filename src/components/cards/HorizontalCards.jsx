import Card from "../card/card.jsx";
import "../../styles/cards.css";
import "../card/teste.js";
import { useState } from "react";

const HorizontalCards = (dataAPI) => {
  const [number, setNumber] = useState(1);

  function changeSlide() {
    let listaFilmes = document.querySelector(".cards");

    listaFilmes.scrollLeft = 290 * number;
  }

  // const tamanhoTotalTela = 4350;

  return (
    <div className="container-cards">
      <ul className="movie-list">
        <li
          onClick={() => {
            setNumber(number - 1);
            changeSlide(number);
          }}
        >
          {"<"}
        </li>
        <li
          onClick={() => {
            setNumber(number + 1);
            changeSlide(number);
          }}
        >
          {">"}
        </li>
      </ul>

      <ul className="cards">
        {dataAPI.dataAPI.map((item, index) => (
          <Card movie={item} key={index} />
        ))}
      </ul>
    </div>
  );
};

export default HorizontalCards;
