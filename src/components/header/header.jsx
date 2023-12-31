import { Link, Outlet } from "react-router-dom";
import "../../styles/header.css";
import ModalRoom from "../ModalsRoom/ModalRoom";
import { useState } from "react";
import CreatedRoom from "../ModalsRoom/CreatedRoom";

export const Header = () => {
  const [salaCriada, setSalaCriada] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [nomeSala, setNomeSala] = useState("");
  const [showRoom, setShowRoom] = useState(false)
  
  return (
    <div className="header">
      <nav>
        <Link to="/home" className="home">
          SYNCSTREAM
        </Link>
        <Link to="/series">SÉRIES</Link>
        <Link to="/movies">FILMES</Link>
        {salaCriada ? (
          <Link onClick={() => setShowRoom(!showRoom)}>SALA DE {nomeSala}</Link>
        ) : (
          <Link onClick={() => setShowModal(!showModal)}>CRIAR SALA</Link>
        )}
      </nav>
      <ModalRoom
        showModal={showModal}
        setShowModal={setShowModal}
        setNomeSala={setNomeSala}
        setSalaCriada={setSalaCriada}
      />
      <CreatedRoom nomeSala={nomeSala} showRoom={showRoom}/>
      <Outlet/>
    </div>
  );
};
