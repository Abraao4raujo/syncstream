import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import "../../styles/header.css";

export const Header = ({ showModal, setShowModal, salaCriada, nomeSala }) => {
  return (
    <div className="header">
      <nav>
        <Link to="/home" className="home">
          SYNCSTREAM
        </Link>
        <Link to="/series">SÉRIES</Link>
        <Link to="/movies">FILMES</Link>
        {salaCriada ? (
          <Link>SALA DE {nomeSala}</Link>
        ) : (
          <Link onClick={() => setShowModal(!showModal)}>CRIAR SALA</Link>
        )}
      </nav>
    </div>
  );
};
