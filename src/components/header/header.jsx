import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../adapters/firebaseConfig";
import "../../styles/header.css";
import { readHasRoom } from "../../adapters/readData";
import CriarSala from "../Room/CriarSala";
import CreatedRoom from "../Room/SalaCriada";

export const Header = () => {
  const [salaCriada, setSalaCriada] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showRoom, setShowRoom] = useState(false);
  const [btnSignOut, setBtnSignOut] = useState(false);
  const [nomeSala, setNomeSala] = useState();
  const [userHasRoom, setUserHasRoom] = useState(false);
  const [dataUser, setDataUser] = useState()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      readHasRoom(user.uid).then((response) => {
        if (user) {
          setBtnSignOut(true);
        }

        if (response.room.hasRoom === null) {
          return null;
        } else {
          setUserHasRoom(true);
          setSalaCriada(true);
          setNomeSala(response.username);
        }
      });
    });
  }, []);

  function deslogar() {
    // DefineStatusUser(auth._currentUser.uid, false);
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
          <Link onClick={() => setShowRoom(true)}>
            SALA DE {nomeSala && nomeSala}
          </Link>
        ) : (
          <Link onClick={() => setShowModal(true)}>CRIAR SALA</Link>
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

      {showModal && (
        <CriarSala
          setSalaCriada={setSalaCriada}
          setShowModal={setShowModal}
          setNomeSala={setNomeSala}
          username={nomeSala}
        />
      )}
      {showRoom && <CreatedRoom username={nomeSala}/>}
      <Outlet />
    </div>
  );
};
