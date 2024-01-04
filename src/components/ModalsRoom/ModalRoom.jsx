import React, { useEffect, useState } from "react";
import { auth } from "../../adapters/firebaseConfig";
import { WriteRoom } from "../../adapters/writeData";
import styled from "styled-components";
import { IoSend } from "react-icons/io5";
import { joinRoom, readUserData } from "../../adapters/readData";

const LabelInfSalaExist = styled.label`
  color: white;
  display: flex;
`;
const ButtonInfSalaExist = styled.button`
  display: flex;
  justify-content: center;
  text-align: center;
  align-content: center;
  background-color: #222;
  color: white;
  border: none;
  cursor: pointer;
  text-decoration: underline;
  margin-left: 10px;
  font-size: 1rem;
  &:hover {
    color: aquamarine;
  }
`;
const DivSalaExist = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  margin-top: 13px;
  font-family: system-ui;
`;
const DivExist = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 13px;
  font-family: system-ui;
`;

const ModalRoom = ({ showModal, setShowModal, setNomeSala, setSalaCriada }) => {
  const user = auth.currentUser;
  const [password, setPassword] = useState();
  const [codeRoom, setCodeRoom] = useState();

  function criarSala() {
    WriteRoom(auth._currentUser.uid, auth._currentUser.displayName, password);
    setNomeSala(auth._currentUser.displayName);
    setSalaCriada(true);
    setShowModal(false);
  }

  function handleCodeRoom() {
    joinRoom(codeRoom, auth._currentUser.displayName);
    // .then((datas) => {
    //   const propertyValues = Object.values(datas);
    //   return propertyValues.filter((user) => user.idRoom);
    // })
    // .then((idRoom) =>
    //   idRoom.map((e) => console.log(e.idRoom.codigo === codeRoom))
    // );
  }

  return (
    <>
      {showModal && (
        <div className="modalContainer">
          <div className="headerModal">
            <h2>Criar Sala</h2>
          </div>
          <div className="mainModal">
            <div className="inputsName">
              <label htmlFor="nome">Nome da sala</label>
              <input
                type="text"
                name="nome"
                id="mainNome"
                value={user.displayName}
                disabled
              />
            </div>
            <div className="inputsPassword">
              <label htmlFor="password">Senha da sala</label>
              <input
                type="text"
                name="password"
                id="mainPassword"
                onChange={({ target }) => {
                  setPassword(target.value);
                }}
              />
            </div>
          </div>
          <div className="footerModal">
            <button
              onClick={() => {
                criarSala();
              }}
            >
              Criar sala
            </button>
          </div>
          <DivSalaExist>
            <LabelInfSalaExist>Digite o código do seu amigo</LabelInfSalaExist>
            <DivExist>
              <input
                type="text"
                name="codigo"
                onChange={({ target }) => setCodeRoom(target.value)}
              />
              <ButtonInfSalaExist>
                <IoSend
                  onClick={() => {
                    handleCodeRoom();
                  }}
                />
              </ButtonInfSalaExist>
            </DivExist>
          </DivSalaExist>
        </div>
      )}
    </>
  );
};

export default ModalRoom;
