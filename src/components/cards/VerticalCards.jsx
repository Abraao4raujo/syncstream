import Card from "../card/card.jsx";
import "../../styles/VerticalCards.css";

const VerticalCards = ({ dataAPI }) => {
  return (
    <>
      <div className="grid-cards">
        {dataAPI.map((item, index) => (
          <Card movie={item} key={index} />
        ))}
      </div>
    </>
  );
};

export default VerticalCards;
