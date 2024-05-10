import useFetch from "../adapters/useFetch";
import HorizontalCards from "../components/cards/HorizontalCards.jsx";

const Movies = () => {
  return <HorizontalCards format={"movie"} page={"2"}/>;
};

export default Movies;
