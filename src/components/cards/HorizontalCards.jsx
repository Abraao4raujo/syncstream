import Card from "../card/card.jsx";
import "../../styles/cards.css";

const HorizontalCards = ({ dataAPI }) => {
  return (
    <>
      <div className="cards">
        {dataAPI.map((item, index) => (
          <Card movie={item} key={index} />
        ))}
      </div>
    </>
  );
};

export default HorizontalCards;
