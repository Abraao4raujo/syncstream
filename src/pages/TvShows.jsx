import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const apiKey = import.meta.env.VITE_APIKEYTMDB;

const TvShows = () => {
  const { id } = useParams();
  const [series, setSeries] = useState([]);

  const getTvShow = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    setSeries(data);
  };

  useEffect(() => {
    const tvShowUrl = `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=pt-BR&page=1`;
    getTvShow(tvShowUrl);
  }, []);

  return (
    <>
      {series && (
        <div className="h-screen flex justify-center items-center">
          <div className="w-[500px] h-[600px]">
            <img
              className="w-full h-full"
              src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
            />
          </div>
          <div className="text-[#fff] w-1/3 ml-10 max-h-[600px]">
            <div>
              <h3 className="text-[2rem]">Nome do Filme: </h3>
              <p className="text-[1.1rem]">{series.name}</p>
            </div>
            <div>
              <h3 className="text-[2rem]">Descrição:</h3>
              <p className="text-[1.1rem]">{series.overview}</p>
            </div>
            <div>
              <h3 className="text-[2rem]">Numero de episodios:</h3>
              <p className="text-[1.1rem]">
                {series.number_of_episodes} episodios
              </p>
            </div>
            <div>
              <h3 className="text-[2rem]">Numero de capitulos:</h3>
              <p className="text-[1.1rem]">
                {series.number_of_seasons} capitulos
              </p>
            </div>
            <div>
              <h3 className="text-[2rem]">Duração de episodio:</h3>
              <p className="text-[1.1rem]">{series.episode_run_time} minutos</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TvShows;
