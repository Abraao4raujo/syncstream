import Card from "../card/card.jsx";
import "../../styles/cards.css";
import { useEffect, useState } from "react";
import Details from "../../pages/Details.jsx";

const HorizontalCards = (dataAPI) => {
  const [number, setNumber] = useState(0);
  const [conteudo, setConteudo] = useState(null);

  const abrirModalDetails = (title, desc, img) => {
    setConteudo({ title, desc, img });
  };

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
    <>
      {conteudo && <Details infApi={conteudo} setConteudo={setConteudo} />}
      <div className="container-cards">
        <ul className="movie-list">
          <li onClick={decreaseNumber}>{"<"}</li>
          <li onClick={increaseNumber}>{">"}</li>
        </ul>

        <ul className="cards">
          {dataAPI.dataAPI.map((item, index) => (
            <Card movie={item} key={index} abrirModalDetails={abrirModalDetails}/>
          ))}
        </ul>
      </div>
    </>
  );
};

export default HorizontalCards;
