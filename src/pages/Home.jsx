import { Header } from "../components/header/header";
import "../styles/main.css";
import HorizontalCards from "../components/cards/HorizontalCards.jsx";
import useFetch from "../adapters/useFetch.jsx";

const Home = () => {
  const data = useFetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${
      import.meta.env.VITE_API_KEY
    }&language=pt-BR&page=1`
  );

  return (
    <>
      <Header />
      <div className="containerFilmeDestaque">
        <img src="../../public/img/capa-zootopia.png" />
      </div>
      <div className="main">
        <h1>Movies</h1>
        <HorizontalCards dataAPI={data} />
      </div>
    </>
  );
};

export default Home;
