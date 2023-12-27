import React, { useState } from "react";

const ModalRoom = ({ showModal, setShowModal, setNomeSala, setSalaCriada }) => {

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
                onChange={(event) => setNomeSala(event.target.value)}
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
