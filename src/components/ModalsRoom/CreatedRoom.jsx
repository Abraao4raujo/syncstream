import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { readUserData } from "../../adapters/readData";

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

const Button = styled.button`
  color: white;
  background-color: #222;
  border: none;
  margin-left: 19px;
  font-family: Arial, Helvetica, sans-serif;
  cursor: pointer;
  font-size: 1.3rem;
`;

const CreatedRoom = ({ nomeSala, showRoom }) => {
  const [usersConnected, setUsersConnected] = useState();
  const [refresh, setRefresh] = useState(false);

  function refreshModal() {
    setRefresh(!refresh);
  }

  useEffect(() => {
    readUserData().then((datas) => {
      console.log("atualizando");
      const propertyValues = Object.values(datas);
      const onlineUsers = propertyValues.filter((user) => user.online);
      setUsersConnected(onlineUsers);
    });
  }, [refresh]);

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
              Refresh
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
        </div>
      )}
    </>
  );
};

export default CreatedRoom;
