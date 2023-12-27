import Card from "../card/card.jsx";
import "../../styles/VerticalCards.css";
import Details from "../../pages/Details";
import { useState } from "react";
const VerticalCards = (dataAPI) => {
  const [conteudo, setConteudo] = useState(null);
  
  const abrirModalDetails = (name, title, desc, img) => {
    setConteudo({ name, title, desc, img });
  };

  return (
    <div className="mainBody">
      {conteudo && <Details infApi={conteudo} setConteudo={setConteudo} />}

      <div className="grid-cards">
        {dataAPI.dataAPI.map((item, index) => (
          <Card
            movie={item}
            key={index}
            abrirModalDetails={abrirModalDetails}
          />
        ))}
      </div>
    </div>
  );
};

export default VerticalCards;
