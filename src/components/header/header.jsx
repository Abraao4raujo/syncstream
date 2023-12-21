import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import "../../styles/header.css";

export const Header = () => {
  return (
    <div className="header">
      <nav>
        <Link to="/home" className="home">
          SYNCSTREAM
        </Link>
        <Link to="/series">SÉRIES</Link>
        <Link to="/movies">FILMES</Link>
        <Link to="room">CRIAR SALA</Link>
        <div className="divInput">
          <div className="inputContainer"></div>
          <input
            type="text"
            className="inputSearch"
            placeholder="Digite o nome do filme ou série"
          />
          <button className="btnSearch">
            <AiOutlineSearch />
          </button>
        </div>
      </nav>
    </div>
  );
};
