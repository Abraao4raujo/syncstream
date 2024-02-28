import useFetch from "../adapters/useFetch";
import HorizontalCards from "../components/cards/HorizontalCards.jsx";

const Series = () => {
  const data = useFetch(
    `https://api.themoviedb.org/3/discover/tv?api_key=${
      import.meta.env.VITE_API_KEY
    }&language=pt-BR&page=1`
  );

  return <HorizontalCards dataAPI={data} />;
};

export default Series;
