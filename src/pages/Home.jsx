import "../styles/main.css";
import HorizontalCards from "../components/cards/HorizontalCards.jsx";
import useFetch from "../adapters/useFetch.jsx";


const Home = () => {
  const data = useFetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${
      import.meta.env.VITE_API_KEY
    }&language=pt-BR&page=1`
  );

  let dataMain = data[0];

  return (
    <>
    
      <div className="containerFilmeDestaque">
        {dataMain && (
          <>
            <img
              src={
                "https://image.tmdb.org/t/p/original/" + dataMain.backdrop_path
              }
            />
            <h2>{dataMain.title}</h2>
          </>
        )}
      </div>
      <div className="main-movie">
        <HorizontalCards dataAPI={data} />
      </div>
    </>
  );
};

export default Home;
