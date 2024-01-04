import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { readUserData } from "../../adapters/readData";
import { IoMdRefresh } from "react-icons/io";
const dbRef = ref(database);
import { ref, child, get } from "firebase/database";
import { auth, database } from "../../adapters/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

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
  /* color: black; */
  font-size: 18px;
  margin-left: 19px;
  font-family: Arial, Helvetica, sans-serif;
  &::marker {
    color: #06da06;
  }
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

const CreatedRoom = ({ nomeSala, showRoom }) => {
  const [usersConnected, setUsersConnected] = useState();
  const [refresh, setRefresh] = useState(false);
  const [codigoRoom, setCodigoRoom] = useState();

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
      console.log("atualizando");
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
                {usersConnected.length > 0 &&
                  usersConnected.map((user) => (
                    <List key={user.username}>{user.username}</List>
                  ))}
              </Lists>
            </div>
          </div>
          <DivFooter>
            <LabelFooter>{codigoRoom && codigoRoom}</LabelFooter>
          </DivFooter>
        </div>
      )}
    </>
  );
};

export default CreatedRoom;
