import "../styles/main.css";
import HorizontalCards from "../components/cards/HorizontalCards.jsx";
import useFetch from "../adapters/useFetch.jsx";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../adapters/firebaseConfig";
import WriteUserData from "../adapters/writeData";
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
            WriteUserData(user.uid, user.displayName, user.email);
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

  return (
    <>
      <div className="containerFilmeDestaque">
        <img src="../../public/img/capa-zootopia.png" />
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
