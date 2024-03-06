import { NavLink } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { get, ref, set } from "firebase/database";
import styled from "styled-components";
import { database as db, auth } from "../../../adapters/firebaseConfig";
import Modal from "../../../components/Modal/Modal";
import { IoSend } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";

import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");

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

const Message = styled.p`
  color: #fff;
  width: 300px;
  word-wrap: break-word;
`;
const DivMessage = styled.div`
  overflow-y: auto;
  height: 300px;
  display: flex;
  flex-direction: column;
  text-align: center;
`;
const FormInput = styled.form`
  width: 90%;
  margin-top: 15px;
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

export const Header = ({ setOpenMenu, optionMenu }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [showRoom, setShowRoom] = useState(false);
  const [nomeUsuario, setNomeUsuario] = useState(); //Dados do usuario que está acessando o site
  const [showSearchRoom, setShowSearchRoom] = useState(false);
  const [nameRooms, setNameRooms] = useState([]);
  const [isJoinedRoom, setIsJoinedRoom] = useState(false);
  const [message, setMessage] = useState();
  const [nameRoom, setNameRoom] = useState();
  const messageRef = useRef();
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((current) => [...current, data]);
    });

    return () => socket.off("receive_message");
  }, [socket]);

  // VERIFIFA SE O USUARIO ESTÁ LOGADO
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setNomeUsuario(user.displayName);
        setIsConnected(true);
      } else {
        setIsConnected(false);
      }
    });
  }, []);

  // ENTRAR EM UMA SALA EXISTENTE
  function joinRoom(nomeSala) {
    const joinRoomRef = ref(db, `Rooms/${nomeSala}/members/${nomeUsuario}`);
    set(joinRoomRef, true)
      .then(() => {
        setNameRoom(nomeSala);
        setIsJoinedRoom(true);
        setShowRoom(true);
        setShowSearchRoom(false);
        socket.emit("set_username", nomeUsuario);
      })
      .catch((error) =>
        console.log("Não foi possivel adicionar o usuário na sala", error)
      );
    return joinRoomRef;
  }

  // DEIXAR SALA EXISTENTE
  function leaveRoom() {
    const leaveRoomRef = ref(db, `Rooms/${nameRoom}/members/${nomeUsuario}`);

    set(leaveRoomRef, false)
      .then(() => {
        setNameRoom("");
        setIsJoinedRoom(false);
        setShowRoom(false);
        setShowSearchRoom(true);
      })
      .catch((error) =>
        console.log(`Não foi possivel deixar a sala. Error: ${error}`)
      );

    return leaveRoomRef;
  }

  // PEGA O NOME DAS SALAS EXISTENTES
  function getNameRooms() {
    const getRoomsRef = ref(db, `Rooms/`);

    get(getRoomsRef).then((e) => {
      setNameRooms(Object.keys(e.val()));
    });

    return getRoomsRef;
  }

  // LIDAR COM EVENTOS DE MUDANÇA DO INPUT
  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  // ENVIA MENSAGEM NA SALA
  const handleSubmit = () => {
    const message = messageRef.current.value;
    if (!message.trim()) return;
    socket.emit("message", message);
    clearInput();
  };

  // LIMPA O INPUT
  const clearInput = () => {
    console.log(messageRef);
    messageRef.current.value = "";
  };

  return (
    <HeaderDiv>
      {optionMenu && (
        <div className={`menuSection ${optionMenu && "open"}`}>
          <div className="menu">
            <nav className="menuNav">
              <ul className="menuLists">
                <NavLink
                  className="menuList"
                  onClick={() => {
                    setOpenMenu(false);
                  }}
                  to={"/series"}
                >
                  SÉRIES
                </NavLink>

                <NavLink
                  className="menuList"
                  onClick={() => {
                    setOpenMenu(false);
                  }}
                  to={"/movies"}
                >
                  FILMES
                </NavLink>

                {isJoinedRoom ? (
                  <NavLink
                    className="menuList"
                    onClick={() => {
                      setShowRoom(true);
                      setOpenMenu(false);
                    }}
                  >
                    SALA DE {nomeSala}
                  </NavLink>
                ) : (
                  // nav para procurar salas existentes
                  <NavLink
                    className="menuList"
                    onClick={() => {
                      setOpenMenu(false);
                      isConnected
                        ? setShowSearchRoom(true)
                        : (window.location.href = "/");
                    }}
                  >
                    SALAS
                  </NavLink>
                )}
              </ul>
            </nav>
          </div>
        </div>
      )}
      <Nav>
        <NavLink
          className="navLink"
          to={isConnected ? "/home" : "/"}
          style={({ isActive }) => {
            return {
              color: isActive ? "rgb(20, 184, 148)" : "#fff",
              fontSize: "1.5rem",
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
              SALA DE {nameRoom}
            </NavLink>
          ) : (
            // nav para procurar salas existentes
            <NavLink
              className="navLink"
              onClick={() => {
                getNameRooms();
                isConnected
                  ? setShowSearchRoom(true)
                  : (window.location.href = "/");
              }}
            >
              SALAS
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
              DESCONECTAR
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
            onClick={(e) => setOpenMenu(!optionMenu)}
            className="menuBtn"
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
                      joinRoom(key);
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
          header={`Sala de ${nameRoom}`}
          main={
            <>
              <DivMessage>
                {messageList.map((message, index) => (
                  <Message key={index}>
                    {message.author}: {message.text}
                  </Message>
                ))}
              </DivMessage>
              <FormInput
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                <DivSendMessage>
                  <InputSendMessage
                    value={messageRef.current && messageRef.current.value}
                    ref={messageRef}
                    onChange={handleChange}
                  />
                  <IoSend
                    style={{
                      color: "rgb(255, 255, 255)",
                      fontSize: "1.4rem",
                      width: "31px",
                      marginLeft: "10px",
                      height: "100%",
                      cursor: "pointer",
                    }}
                    onClick={() => handleSubmit()}
                  />
                </DivSendMessage>
              </FormInput>
            </>
          }
          footer={<Label onClick={leaveRoom}>Sair da sala</Label>}
        />
      )}
    </HeaderDiv>
  );
};
