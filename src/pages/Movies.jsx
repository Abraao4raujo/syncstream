import useFetch from "../adapters/useFetch";
import VerticalCards from "../components/cards/VerticalCards.jsx";

const Movies = () => {
  const data = useFetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${
      import.meta.env.VITE_API_KEY
    }&language=pt-BR&page=1`
  );

  return (
    <>
      <VerticalCards dataAPI={data} />
    </>
  );
};

export default Movies;
