import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const apiKey = import.meta.env.VITE_APIKEYTMDB;

const Movie = ({ path }) => {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);

  const getMovie = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    setMovie(data);
  };

  const formatCurrency = (number) => {
    if (number) {
      return number.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    }
  };

  useEffect(() => {
    const movieUrl = `https://api.themoviedb.org/3/${path}/${id}?api_key=${apiKey}&language=pt-BR&page=1`;
    getMovie(movieUrl);
  }, []);

  return (
    <>
      {movie && (
        <div className="h-screen flex justify-center items-center">
          <div className="w-[500px] h-[600px]">
            <img
              className="w-full h-full"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            />
          </div>
          <div className="text-[#fff] w-1/3 ml-10 max-h-[600px]">
            <div>
              <h3 className="text-[2rem]">Nome do Filme: </h3>
              <p className="text-[1.1rem]">{movie.title}</p>
            </div>
            <div>
              <h3 className="text-[2rem]">Descrição:</h3>
              <p className="text-[1.1rem]">{movie.overview}</p>
            </div>
            <div>
              <h3 className="text-[2rem]">Orçamento:</h3>
              <p className="text-[1.1rem]">{formatCurrency(movie.budget)}</p>
            </div>
            <div>
              <h3 className="text-[2rem]">Receita:</h3>
              <p className="text-[1.1rem]">{formatCurrency(movie.revenue)}</p>
            </div>
            <div>
              <h3 className="text-[2rem]">Duração:</h3>
              <p className="text-[1.1rem]">{movie.runtime} minutos</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Movie;
