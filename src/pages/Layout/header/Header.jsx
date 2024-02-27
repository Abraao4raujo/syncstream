import { NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { child, get, onValue, ref, set } from "firebase/database";
import styled from "styled-components";
import { database as db, auth } from "../../../adapters/firebaseConfig";
import Modal from "../../../components/Modal/Modal";
const dbRef = ref(db);
import { IoSend } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";

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
  @media (max-width: 700px) {
    justify-content: space-between;
  }
`;

const NavOptions = styled.div`
  @media (max-width: 700px) {
    display: none;
  }
`;

const OptionMenu = styled.div`
  display: none;
  @media (max-width: 700px) {
    display: block;
  }
`;

const ListsMessage = styled.ul`
  color: #333;
  background-color: #d9d9d9;
  list-style: none;
  padding: 15px;
  width: 290px;
  height: 180px;
  overflow-y: auto;
`;

const DivReceiver = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: arial;
`;

const DivSender = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-family: arial;
`;

const Sender = styled.li`
  font-size: 0.8rem;
  font-weight: bold;
`;

const MessageSender = styled.li`
  background-color: #999999;
  max-width: 150px;
  margin-left: 30px;
  padding: 5px;
  border-radius: 10px 1px 10px 10px;
  display: flex;
  margin-bottom: 4px;
  margin-right: 10px;
`;

const Receiver = styled.li`
  font-size: 0.8rem;
  font-weight: bold;
`;

const MessageReceiver = styled.div`
  background-color: #999999;
  max-width: 150px;
  margin-left: 10px;
  margin-bottom: 4px;
  padding: 5px;
  border-radius: 1px 10px 10px 10px;
  display: flex;
`;
const InputSendMessage = styled.input`
  color: #333;
  padding: 8px;
  width: 270px;
  border: none;
`;
const DivSendMessage = styled.div`
  border: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Header = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [showRoom, setShowRoom] = useState(false);
  const [nomeSala, setNomeSala] = useState();
  const [nomeUsuario, setNomeUsuario] = useState();
  const [showSearchRoom, setShowSearchRoom] = useState(false);
  const [dataRoom, setDataRoom] = useState();
  const [nameRooms, setNameRooms] = useState([]);
  const [isJoinedRoom, setIsJoinedRoom] = useState(false);
  const [donoSala, setDonoSala] = useState();
  const [message, setMessage] = useState();
  const [messageSended, setMessageSended] = useState();
  const [yourMessage, setYourMessage] = useState();
  const [theirMessages, setTheirMessages] = useState();
  const [allMessages, setAllMessages] = useState();

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

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setNomeSala(user.displayName);
        setNomeUsuario(user.displayName);
      }
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
        existingUsers.splice(existingUsers.indexOf(nomeSala), 1);
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

  function sendMessage() {
    const guestsRef = ref(db, `Rooms/${donoSala}/chats/`);

    get(guestsRef).then((snapshot) => {
      const existingMessage = snapshot.val() || {};

      if (!Array.isArray(existingMessage[nomeUsuario])) {
        existingMessage[nomeUsuario] = [];
      }

      existingMessage[nomeUsuario].push(message);

      set(guestsRef, existingMessage)
        .then(() => {
          setMessage("");
        })
        .catch((error) =>
          console.log(`Não foi possivel enviar a mensagem. Error: ${error}`)
        );
    });
  }

  useEffect(() => {
    const guestsRef = ref(db, `Rooms/${donoSala}/chats/`);

    get(guestsRef).then((snapshot) => {
      const existingMessage = snapshot.val() || [];

      setAllMessages(existingMessage);
      Object.entries(existingMessage).map((message) => {
        setMessageSended(message);
      });
    });
  }, [message]);

  useEffect(() => {
    const guestsRef = ref(db, `Rooms/${donoSala}/chats/${nomeUsuario}`);

    get(guestsRef).then((snapshot) => {
      const existingMessage = snapshot.val() || [];
      setYourMessage(Object.values(existingMessage));
    });
  }, [message]);

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
        <NavOptions>
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
        </NavOptions>
        <OptionMenu>
          <RxHamburgerMenu
            style={{
              color: "#fff",
              fontSize: "2rem",
              padding: "10px",
              cursor: "pointer",
            }}
          />
        </OptionMenu>
      </Nav>

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

      {/* MODAL DE QUANDO O USUARIO ENTRAR EM UMA SALA */}
      {showRoom && (
        <Modal
          header={`Sala de ${donoSala}`}
          main={
            <div>
              <ListsMessage>
                {Object.entries(allMessages).map(([user, messages]) => (
                  <React.Fragment key={user}>
                    {user === nomeUsuario ? (
                      messages.map((msg, index) => (
                        <DivSender key={index}>
                          <Sender>You</Sender>
                          <MessageSender key={index}>{msg}</MessageSender>
                        </DivSender>
                      ))
                    ) : (
                      <DivReceiver>
                        <Receiver>{user}</Receiver>
                        {messages.map((msg, index) => (
                          <MessageReceiver key={index}>{msg}</MessageReceiver>
                        ))}
                      </DivReceiver>
                    )}
                  </React.Fragment>
                ))}
              </ListsMessage>
              <DivSendMessage>
                <InputSendMessage
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <IoSend
                  style={{
                    color: "#fff",
                    fontSize: "1.4rem",
                    background: "blue",
                    width: "34px",
                    height: "31px",
                    borderRadius: "0px 0px 10px 0px",
                    cursor: "pointer",
                  }}
                  onClick={sendMessage}
                />
              </DivSendMessage>
            </div>
          }
          footer={<Label onClick={exitRoom}>Sair da sala</Label>}
        />
      )}
    </HeaderDiv>
  );
};

// FUNCIONALIDADE QUE MOSTRA OS USUARIOS ONLINES
// {dataRoom.map((key, index) => (
//                 <li
//                   key={index}
//                   style={{ fontFamily: "Arial", fontWeight: "bold" }}
//                 >
//                   {key}
//                 </li>
//               ))}
