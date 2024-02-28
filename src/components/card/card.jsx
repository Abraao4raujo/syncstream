import "../../styles/card.css";

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
    <li className="card" key={movie.id} onClick={abrirModal}>
      <div className="inf-movie">
        <label className="title-movie">{movie.name || movie.title}</label>
        <img
          src={`${image_path}${movie.poster_path}`}
          alt={movie.name || movie.title}
          className="poster"
        />

        <label className="overview-movie">
          {movie.overview.length < 200
            ? movie.overview
                .slice(0, movie.overview.length - 3)
                .padEnd(movie.overview.length, ".")
            : movie.overview
                .slice(0, movie.overview.length / 3)
                .padEnd(movie.overview.length / 3 + 3, ".")}
        </label>
      </div>
    </li>
  );
};

export default Card;
