import "../../styles/card.css";
import { BsPlayCircle } from "react-icons/Bs";

const Card = ({ movie, abrirModalDetails }) => {
  const image_path = "https://image.tmdb.org/t/p/w500";

  const abrirModal = () => {
    scrollTo(0, 0);
    abrirModalDetails(
      movie.name,
      movie.title,
      movie.overview,
      `${image_path}${movie.poster_path}`
    );
  };

  return (
    <>
      <li className="card" key={movie.id} onClick={abrirModal}>
        <div className="inf-movie">
          <img
            src={`${image_path}${movie.poster_path}`}
            alt={movie.name || movie.title}
            className="poster"
          />
          <div className="play-container">
            <div className="play">
              <BsPlayCircle />
            </div>
          </div>
          <label className="title-movie">{movie.name || movie.title}</label>
          <label className="overview-movie">{movie.overview}</label>
        </div>
      </li>
    </>
  );
};

export default Card;
