import "../../styles/card.css";
import { BsPlayCircle } from "react-icons/Bs";

const Card = (movie) => {
  const image_path = "https://image.tmdb.org/t/p/w500";
  return (
    <li className="card" key={movie.id}>
      <div className="inf-movie">
        <img
          src={`${image_path}${movie.movie.poster_path}`}
          alt={movie.title}
          className="poster"
        />
        <div className="play-container">
          <div className="play">
            <BsPlayCircle />
          </div>
        </div>
        <label className="title-movie">{movie.movie.title}</label>
        <label className="overview-movie">{movie.movie.overview}</label>
      </div>
    </li>
  );
};

export default Card;
