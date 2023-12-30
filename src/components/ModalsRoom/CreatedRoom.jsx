import React, { useState } from "react";
import styled from "styled-components";

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
  const [usersConnected, setUsersConnected] = useState([
    {
      id: 1,
      name: "abraham1",
    },
    {
      id: 2,
      name: "abraham2",
    },
    {
      id: 3,
      name: "abraham3",
    },
    {
      id: 4,
      name: "abraham4",
    },
  ]);
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
                {usersConnected.map(({ id, name }) => (
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
