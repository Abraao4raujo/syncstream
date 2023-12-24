import Card from "../card/card.jsx";
import "../../styles/cards.css";
import { useEffect, useState } from "react";

const HorizontalCards = (dataAPI) => {
  const [number, setNumber] = useState(0);

  function changeSlide() {
    let listaFilmes = document.querySelector(".cards");

    if (number >= 0) {
      listaFilmes.scrollLeft = 290 * number;
    }
  }

  function decreaseNumber() {
    setNumber((prevNumber) => prevNumber - 1);
  }

  function increaseNumber() {
    setNumber((prevNumber) => prevNumber + 1);
  }

  useEffect(() => {
    changeSlide(number);
  }, [number]);

  return (
    <div className="container-cards">
      <ul className="movie-list">
        <li onClick={decreaseNumber}>{"<"}</li>
        <li onClick={increaseNumber}>{">"}</li>
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
