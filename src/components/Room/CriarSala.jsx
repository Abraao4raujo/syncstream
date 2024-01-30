import React, { useEffect, useRef, useState } from "react";
import { auth } from "../../adapters/firebaseConfig";
import styled from "styled-components";

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

const CriarSala = ({ setShowModal, setSalaCriada, setNomeSala }) => {
  const [password, setPassword] = useState();
  const [showInputCode, setShowInputCode] = useState(false);
  // const [nomeSala, setNomeSala] = useState("");
  const [codeRoom, setCodeRoom] = useState();
  const [serchRoom, setSearchRoom] = useState(false);

  const montagemInicial = useRef(false);

  const username = auth.currentUser.displayName;

  useEffect(() => {
    if (codeRoom != null) {
      console.log("Procurando sala");
      setSearchRoom(true);
    } else {
      setSearchRoom(false);
    }
  }, [codeRoom]);

  function criarSala() {
    // WriteRoom(auth._currentUser.uid, auth._currentUser.displayName, password);
    // UPDATE STATUS ROOM TO TRUE

    setNomeSala(username);
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
