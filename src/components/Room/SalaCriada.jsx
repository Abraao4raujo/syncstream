import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { ref, child, get, onValue } from "firebase/database";
import { auth, database } from "../../adapters/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

import { BsClipboard2, BsClipboard2Check } from "react-icons/bs";

const Label = styled.label`
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
  color: "white";
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

const CreatedRoom = ({ username }) => {
  const [messageSended, setMessagesSended] = useState("");
  const [chat, setChat] = useState([]);
  const [usersInRoom, setUsersInRoom] = useState();
  const [codeRoom, setCodeRoom] = useState();
  const [copySuccess, setCopySuccess] = useState(
    <BsClipboard2 style={{ fontSize: "1.2rem", color: "black" }} />
  );

  const user = auth.currentUser;

  useState(() => {
    hasUserInRoom(user.uid);
  }, []);

  async function hasUserInRoom(idUser) {
    get(child(ref(database), `Users/${idUser}/room/`)).then((data) => {
      setUsersInRoom(data.val().guest);
      setCodeRoom(data.val().codeRoom);
    });
  }

  return (
    <>
      {
        <div className="modalContainer">
          <div className="headerModal">
            <h2>Sala de {username}</h2>
          </div>
          <div className="mainModal">
            <div className="inputsToCreatedRoom">
              <Label>Usuarios Conectados</Label>

              <Lists>
                {usersInRoom &&
                  usersInRoom.length > 0 &&
                  usersInRoom.map((user) => <List key={user}>{user}</List>)}
              </Lists>
            </div>
          </div>
          <div className="chat">
            <div className="chat-message">
              <ul>
                {chat.map((msg) => (
                  <Message key={msg}>{msg}</Message>
                ))}
              </ul>
            </div>
          </div>
          <DivFooter>
            {codeRoom && (
              <LabelFooter
                onClick={() => {
                  navigator.clipboard.writeText(codeRoom);
                  setCopySuccess(
                    <BsClipboard2Check
                      style={{ fontSize: "1.2rem", color: "black" }}
                    />
                  );
                }}
              >
                {codeRoom}

                <Label>{copySuccess}</Label>
              </LabelFooter>
            )}
          </DivFooter>
        </div>
      }
    </>
  );
};

export default CreatedRoom;
