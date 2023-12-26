import "../../styles/card.css";
import { BsPlayCircle } from "react-icons/Bs";
import Details from "../../pages/Details";
import { useState } from "react";

const Card = (movie) => {
  const image_path = "https://image.tmdb.org/t/p/w500";
  const [clicou, setClicou] = useState(false);
  const [conteudo, setConteudo] = useState({
    title: movie.movie.title,
    desc: movie.movie.overview,
    img: image_path,
  });

  function abrirModalDetails() {
    setClicou(!clicou);
  }

  return (
    <>
      <li className="card" key={movie.id} onClick={() => abrirModalDetails()}>
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
      {clicou && (
        <Details
          imgPath={conteudo.img}
          title={conteudo.title}
          desc={conteudo.desc}
        />
      )}
    </>
  );
};

export default Card;
