import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { readUserData } from "../../adapters/readData";
import { auth } from "../../adapters/firebaseConfig";
import { getDatabase, ref, child, get } from "firebase/database";

const Label = styled.p`
  color: #fff;
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

const CreatedRoom = ({ nomeSala, showRoom }) => {
  const [usersConnected, setUsersConnected] = useState([]);
  const dbRef = ref(getDatabase());

  async function searchUsers() {
    const snapshot = await get(child(dbRef, `Users/${nomeSala}`));
    if (await snapshot.val()) {
      setUsersConnected(await snapshot.val().username);
    }
    // if (snapshot.exists()) {
    //   setUsersConnected(snapshot.val());
    // }
  }
  useEffect(() => {
    searchUsers();
  }, []);
  return (
    <>
      {showRoom && (
        <div className="modalContainer">
          <div className="headerModal">
            <h2>Sala de {nomeSala}</h2>
          </div>
          <div className="mainModal">
            <div className="inputsToCreatedRoom">
              <Label>Usuarios Conectados</Label>

              <Lists>
                {usersConnected && usersConnected.map(({ id, name }) => (
                  <List key={id}>{name}</List>
                ))}
              </Lists>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreatedRoom;
