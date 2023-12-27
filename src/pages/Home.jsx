import "../styles/main.css";
import HorizontalCards from "../components/cards/HorizontalCards.jsx";
import useFetch from "../adapters/useFetch.jsx";
import { Link } from "react-router-dom";
import ModalRoom from "../components/ModalsRoom/ModalRoom.jsx";

const Home = () => {
  const data = useFetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${
      import.meta.env.VITE_API_KEY
    }&language=pt-BR&page=1`
  );

  return (
    <>
      {/* {showModal && (
        <div className="modalContainer">
          <div className="headerModal">
            <h2>Criar Sala</h2>
          </div>
          <div className="mainModal">
            <div className="inputsName">
              <label htmlFor="nome">Nome da sala</label>
              <input
                type="text"
                name="nome"
                id="mainNome"
                onChange={(event) => setNomeSala(event.target.value)}
              />
            </div>
            <div className="inputsPassword">
              <label htmlFor="password">Senha da sala</label>
              <input type="text" name="password" id="mainPassword" />
            </div>
          </div>
          <div className="footerModal">
            <button
              onClick={() => {
                setSalaCriada(true);
                setShowModal(false);
              }}
            >
              Criar sala
            </button>
          </div>
        </div>
      )} */}
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
