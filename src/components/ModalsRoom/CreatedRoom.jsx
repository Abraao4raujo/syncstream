import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { readUserData } from "../../adapters/readData";
import { IoMdRefresh } from "react-icons/io";
import { ref, child, get } from "firebase/database";
import { auth, database } from "../../adapters/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import io from "socket.io-client";

const dbRef = ref(database);

const Label = styled.p`
  color: #fff;
`;

const LabelFooter = styled.p`
  color: #222;
  font-size: 16px;
  font-weight: bold;
`;

const Lists = styled.ul`
  background-color: #fff;
  padding: 10px;
`;

const List = styled.li`
  font-size: 18px;
  margin-left: 19px;
  font-family: Arial, Helvetica, sans-serif;
  &::marker {
    color: #06da06;
  }
`;
const Message = styled.li`
  font-size: 16px;
  font-family: Arial, Helvetica, sans-serif;
`;

const Button = styled.button`
  color: white;
  background-color: #222;
  border: none;
  margin-left: 19px;
  font-family: Arial, Helvetica, sans-serif;
  cursor: pointer;
  font-size: 1.3rem;
`;

const DivFooter = styled.div`
  background-color: white;
  border: none;
  border-radius: 8px;
  padding: 10px;
  margin-left: 19px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.3rem;
  position: absolute;
  bottom: 40px;
`;

const socket = io("http://localhost:4000");

const CreatedRoom = ({ nomeSala, showRoom }) => {
  const [usersConnected, setUsersConnected] = useState();
  const [refresh, setRefresh] = useState(false);
  const [codigoRoom, setCodigoRoom] = useState();
  const [messageSended, setMessagesSended] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on("message", (message) => {
      chat.push(message);
    });
    return () => {
      socket.off("message", (message) => console.log(message));
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    chat.push(messageSended);

    setMessagesSended(e.target[0].value);

    socket.emit("message", messageSended);

    console.log(messageSended);
  };

  function refreshModal() {
    setRefresh(!refresh);
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        readIdRoom(user.uid);
      }
    });
  }, []);

  useEffect(() => {
    readUserData().then((datas) => {
      const propertyValues = Object.values(datas);
      const onlineUsers = propertyValues.filter((user) => user.online);
      setUsersConnected(onlineUsers);
    });
  }, [refresh]);

  async function readIdRoom(idUser) {
    try {
      const snapshot = await get(child(dbRef, `Users/${idUser}/idRoom/codigo`));
      if (snapshot.exists()) {
        setCodigoRoom(snapshot.val());
      } else {
        console.log("No data available");
        return null;
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {showRoom && (
        <div className="modalContainer">
          <div className="headerModal">
            <h2>Sala de {nomeSala}</h2>
            <Button
              onClick={() => {
                refreshModal();
              }}
            >
              <IoMdRefresh />
            </Button>
          </div>
          <div className="mainModal">
            <div className="inputsToCreatedRoom">
              <Label>Usuarios Conectados</Label>

              <Lists>
                {usersConnected &&
                  usersConnected.length > 0 &&
                  usersConnected.map((user) => (
                    <List key={user.username}>{user.username}</List>
                  ))}
              </Lists>
            </div>
          </div>
          <div className="chat">
            <div className="chat-message">
              <ul>
                {chat.map((msg) => (
                  <Message key={msg} style={{ color: "white" }}>
                    {msg}
                  </Message>
                ))}
              </ul>
            </div>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                // onChange={(e) => setMessagesSended(e.target.value)}
              />
              <button>Enviar</button>
            </form>
          </div>
          <DivFooter>
            {codigoRoom && <LabelFooter>{codigoRoom}</LabelFooter>}
          </DivFooter>
        </div>
      )}
    </>
  );
};

export default CreatedRoom;
