import React from "react";
import { auth } from "../../adapters/firebaseConfig";

const ModalRoom = ({ showModal, setShowModal, setNomeSala, setSalaCriada }) => {
  const user = auth.currentUser;
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
              />
            </div>
            <div className="inputsPassword">
              <label htmlFor="password">Senha da sala</label>
              <input type="text" name="password" id="mainPassword" />
            </div>
          </div>
          <div className="footerModal">
            <button
              onClick={() => {
                const nomeSala = document.querySelector("#mainNome").value;
                setNomeSala(nomeSala);
                setSalaCriada(true);
                setShowModal(false);
              }}
            >
              Criar sala
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalRoom;
