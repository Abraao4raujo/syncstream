import React, { useEffect, useRef, useState } from "react";
import { auth } from "../../adapters/firebaseConfig";
import styled from "styled-components";
import { writeRoom } from "../../adapters/writeData";

const OptionsRoom = styled.ul`
  display: flex;
  justify-content: space-evenly;
`;
const OptionRoom = styled.li`
  font-size: 1.1rem;
  font-weight: bold;
  text-transform: uppercase;
  color: white;
  list-style: none;
  font-family: system-ui;
`;
const HeaderModal = styled.div`
  width: 90%;
`;
const MainModal = styled.div`
  font-family: "Bebas Neue", sans-serif;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 80%;
`;
const Label = styled.label`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.8rem;
  color: white;
  cursor: pointer;
`;
const FooterModal = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Btn = styled.div`
  font-family: "Bebas Neue", sans-serif;
  font-size: 1rem;
  padding: 8px;
  border-radius: 20px;
  background-color: #d9d9d9;
  color: black;
  border: none;
  width: 100px;
  display: flex;
  cursor: pointer;
  font-weight: bold;
  justify-content: center;
  margin-bottom: 10px;
`;

const InputCode = styled.input`
  border-radius: 10px;
  padding: 5px;
  margin: 3px;
  text-align: center;
`;

const CriarSala = ({ setShowModal, setSalaCriada, setNomeSala, username}) => {
  const [showInputCode, setShowInputCode] = useState(false);
  const [codeRoom, setCodeRoom] = useState();
  const [serchRoom, setSearchRoom] = useState(false);
  
  useEffect(() => {
    console.log(codeRoom);
    if (codeRoom != "") {
      console.log("Procurando sala");
      setSearchRoom(true);
    } else {
      setSearchRoom(false);
    }
  }, [codeRoom]);

  function criarSala() {
    // criando a sala passando id e username
    writeRoom(auth._currentUser.uid, auth._currentUser.displayName);

    setNomeSala(auth._currentUser.displayName);
    setSalaCriada(true);
    setShowModal(false);
  }

  return (
    <div className="modalContainer">
      <HeaderModal>
        <OptionsRoom>
          <OptionRoom>Criar Sala</OptionRoom>
        </OptionsRoom>
      </HeaderModal>
      <MainModal>
        <div className="inputsName">
          <label htmlFor="nome">Nome da sala</label>
          <input
            type="text"
            name="nome"
            id="mainNome"
            value={username}
            disabled
          />
        </div>
      </MainModal>
      <FooterModal>
        <Btn
          onClick={() => {
            criarSala();
          }}
        >
          Criar sala
        </Btn>
        <Label
          onClick={() => {
            setShowInputCode(!showInputCode);
          }}
        >
          Entrar em sala existente
        </Label>
        {showInputCode && (
          <InputCode
            placeholder="Digite o codigo da sala"
            onChange={(e) => {
              setCodeRoom(e.target.value);
            }}
          />
        )}
        {serchRoom && <Label>Procurando sala</Label>}
      </FooterModal>
    </div>
  );
};

export default CriarSala;
