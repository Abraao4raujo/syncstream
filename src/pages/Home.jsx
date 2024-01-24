import "../styles/main.css";
import HorizontalCards from "../components/cards/HorizontalCards.jsx";
import useFetch from "../adapters/useFetch.jsx";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../adapters/firebaseConfig";
import { DefineStatusUser } from "../adapters/writeData";
import { readUserData } from "../adapters/readData.js";

const Home = () => {
  // verifica se o usuario ainda está conectado
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user === null) {
        window.location.href = "/";
      } else {
        readUserData(user.uid).then((e) => {
          if (e === true) {
            return null;
          } else {
            DefineStatusUser(user.uid, true, user.displayName, user.email);
          }
        });
      }
    });
  }, []);

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
        <Link to="../movies" className="linkToOtherPage">
          <h1>Movies {">"}</h1>
        </Link>
        <HorizontalCards dataAPI={data} />
      </div>
    </>
  );
};

export default Home;
