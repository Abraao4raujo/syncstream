import { Outlet, Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { child, get, onValue, ref, set } from "firebase/database";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { HiUserGroup } from "react-icons/hi";
import { database as db, auth } from "../../../adapters/firebaseConfig";
import Modal from "../../../components/Modal/Modal";
const dbRef = ref(db);

const HeaderDiv = styled.div`
  width: 100%;
  height: 65px;
  background-color: #333;
`;

const Label = styled.label`
  color: #fff;
  cursor: pointer;
  font-family: system-ui, -apple-system, BlinkMacSystemFont;
  font-size: 1rem;
  &:hover {
    color: #007bff;
  }
`;
const LabelCode = styled.label`
  color: #777;
  cursor: pointer;
  font-family: system-ui, -apple-system, BlinkMacSystemFont;
  font-size: 1rem;
  padding: 10px;
  background-color: #fff;
`;

const ListUser = styled.li`
  cursor: pointer;
  padding: 14px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont;
  margin: 10px;
  background-color: #444;
  border-radius: 4px;
  list-style: none;
`;
const ListsUser = styled.ul`
  overflow-y: auto;
  max-height: 165px;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: start;
  text-align: center;
  width: 100%;
  height: 65px;
  background: linear-gradient(#222, transparent);
  z-index: 1;
`;

const LinkNav = styled.a`
  font-size: 1.5rem;
  font-family: "Bebas Neue", sans-serif;
  color: white;
  text-decoration: none;
  letter-spacing: 2px;
  margin-left: 50px;

  &:hover {
    color: rgb(0, 255, 255);
    transition: ease 0.3s;
    cursor: pointer;
  }
`;

export const Header = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [salaCriada, setSalaCriada] = useState(false);
  const [showRoom, setShowRoom] = useState(false);
  const [nomeSala, setNomeSala] = useState();
  const [nomeUsuario, setNomeUsuario] = useState();
  const [maxGuest, setMaxGuest] = useState(5);
  const [showSearchRoom, setShowSearchRoom] = useState(false);
  const [dataRoom, setDataRoom] = useState();
  const [nameRooms, setNameRooms] = useState([]);
  const [dataRooms, setDataRooms] = useState();
  const [isJoinedRoom, setIsJoinedRoom] = useState(false);
  const [donoSala, setDonoSala] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsConnected(true);
      } else {
        setIsConnected(false);
      }
    });
  }, []);

  useEffect(() => {
    onValue(child(dbRef, `Rooms/`), (snapshot) => {
      let roomsArray = [];
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;

        roomsArray.push(childKey);
      });
      setNameRooms(roomsArray);
    });
  }, []);

  function joinSpecificRoom(nameRoom) {
    const guestsRef = ref(db, `Rooms/${nameRoom}/guests/`);

    get(guestsRef).then((snapshot) => {
      const existingUsers = snapshot.val() || [];
      existingUsers.push(nomeSala);

      set(guestsRef, existingUsers)
        .then(() => {
          console.log(`${nomeSala} adicionado na sala de ${donoSala}`);
          setIsJoinedRoom(true);
          setShowSearchRoom(false);
          setShowRoom(true);
          setDataRoom(existingUsers);
        })
        .catch((error) =>
          console.log(`Não foi possivel entrar na sala. Error: ${error}`)
        );
    });
  }

  function exitRoom() {
    const guestsRef = ref(db, `Rooms/${donoSala}/guests/`);

    get(guestsRef).then((snapshot) => {
      const existingUsers = snapshot.val();
      if (existingUsers) {
        

  existingUsers.splice(existingUsers.indexOf(nomeSala), 1)
      }

      set(guestsRef, existingUsers)
        .then(() => {
          console.log(`${nomeSala} removido da sala de ${donoSala}`);
          setIsJoinedRoom(false);
          setShowRoom(false);
          setShowSearchRoom(true);
        })
        .catch((error) =>
          console.log(`Não foi possivel entrar na sala. Error: ${error}`)
        );
    });
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setNomeSala(user.displayName);
        setNomeUsuario(user.displayName);
      }
    });
  }, []);

  return (
    <HeaderDiv>
      {/* <Navigation valueSalaCriada={salaCriada} /> */}
      <Nav>
        <NavLink
          className="navLink"
          to={isConnected ? "/home" : "/"}
          style={({ isActive }) => {
            return {
              color: isActive ? "rgb(20, 184, 148)" : "#fff",
              fontSize: "2rem",
            };
          }}
        >
          SYNCSTREAM
        </NavLink>
        <NavLink
          className="navLink"
          to={isConnected ? "/series" : "/"}
          style={({ isActive }) => {
            return {
              color: isActive ? "rgb(20, 184, 148)" : "#fff",
            };
          }}
        >
          SÉRIES
        </NavLink>
        <NavLink
          className="navLink"
          to={isConnected ? "/movies" : "/"}
          style={({ isActive }) => {
            return {
              color: isActive ? "rgb(20, 184, 148)" : "#fff",
            };
          }}
        >
          FILMES
        </NavLink>

        {isJoinedRoom ? (
          <NavLink
            className="navLink"
            onClick={() => {
              setShowRoom(true);
            }}
          >
            Sala de {nomeSala}
          </NavLink>
        ) : (
          // nav para procurar salas existentes
          <NavLink
            className="navLink"
            onClick={() => {
              isConnected
                ? setShowSearchRoom(true)
                : (window.location.href = "/");
            }}
          >
            Procurar salas
          </NavLink>
        )}

        {isConnected && (
          <NavLink
            className="navLink"
            onClick={(e) => {
              e.preventDefault();
              signOut(auth);
              setIsConnected(false);
            }}
          >
            Deslogar
          </NavLink>
        )}
      </Nav>

      {/* MODAL DE QUANDO O USUARIO ENTRAR EM UMA SALA */}
      {showRoom && (
        <Modal
          header={`Sala de ${nomeSala}`}
          main={
            <ul
              style={{
                color: "white",
              }}
            >
              {dataRoom.map((key, index) => (
                <li key={index}>{key}</li>
              ))}
            </ul>
          }
          footer={
            <>
              {/* <LabelCode>{dataRoom.code}</LabelCode> */}
              <Label onClick={exitRoom}>Sair da sala</Label>
            </>
          }
        />
      )}

      {/* MODAL DAS SALAS EXISTENTES */}
      {showSearchRoom && (
        <Modal
          header="Salas Existentes"
          main={
            <ListsUser
              style={{
                color: "white",
                overflowY: "auto",
                maxHeight: "165px",
                width: "303px",
              }}
            >
              {nameRooms &&
                nameRooms.map((key, index) => (
                  <ListUser
                    key={index}
                    onClick={() => {
                      setDonoSala(key);
                      joinSpecificRoom(key);
                    }}
                  >
                    Sala de {key}
                  </ListUser>
                ))}
            </ListsUser>
          }
          footer={
            <Label
              onClick={() => {
                setShowSearchRoom(false);
              }}
            >
              Voltar para o inicio
            </Label>
          }
        ></Modal>
      )}
    </HeaderDiv>
  );
};
