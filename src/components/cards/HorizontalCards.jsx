import Card from "../card/card.jsx";
import "../../styles/cards.css";
import { useState } from "react";
import Details from "../../pages/Details.jsx";

const HorizontalCards = (dataAPI) => {
  const [conteudo, setConteudo] = useState(null);

  const abrirModalDetails = (name, title, desc, img, backdropPath) => {
    setConteudo({ name, title, desc, img, backdropPath });
  };

  return (
    <>
      {conteudo && <Details infApi={conteudo} setConteudo={setConteudo} />}
      <div className="container-cards">
        <ul className="cards">
          {dataAPI.dataAPI.map((item, index) => (
            <Card
              movie={item}
              key={index}
              abrirModalDetails={abrirModalDetails}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

export default HorizontalCards;
