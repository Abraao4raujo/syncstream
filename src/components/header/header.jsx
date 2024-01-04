import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, database } from "../../adapters/firebaseConfig";
import ModalRoom from "../ModalsRoom/ModalRoom";
import CreatedRoom from "../ModalsRoom/CreatedRoom";
import "../../styles/header.css";
import { DefineStatusUser } from "../../adapters/writeData";
import { checkRoomExist } from "../../adapters/readData";

export const Header = () => {
  const [salaCriada, setSalaCriada] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [nomeSala, setNomeSala] = useState("");
  const [showRoom, setShowRoom] = useState(false);
  const [btnSignOut, setBtnSignOut] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        setBtnSignOut(true);
        if (checkRoomExist(user.uid).then((data) => setSalaCriada(data))) {
          setSalaCriada(true);
          setNomeSala(user.displayName);
        }
      }
    });
  }, []);

  function deslogar() {
    DefineStatusUser(auth._currentUser.uid, false);
    signOut(auth);
  }

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

        {btnSignOut && (
          <Link
            onClick={(e) => {
              e.preventDefault();
              deslogar();
            }}
          >
            sair da conta
          </Link>
        )}
      </nav>
      <ModalRoom
        showModal={showModal}
        setShowModal={setShowModal}
        setNomeSala={setNomeSala}
        setSalaCriada={setSalaCriada}
      />
      <CreatedRoom nomeSala={nomeSala} showRoom={showRoom} />
      <Outlet />
    </div>
  );
};
