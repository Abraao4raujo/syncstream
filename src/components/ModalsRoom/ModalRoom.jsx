import React, { useState } from "react";
import { auth } from "../../adapters/firebaseConfig";
// import { WriteRoom } from "../../adapters/writeData";
// import { joinRoom } from "../../adapters/readData";
// import { IoSend } from "react-icons/io5";
import CriarSala from "../Room/CriarSala";

const ModalRoom = ({ showModal, setSalaCriada, setShowModal, setNomeSala }) => {
  const user = auth.currentUser;
  const [codeRoom, setCodeRoom] = useState();

  return (
    <>
      {showModal && (
        <CriarSala
          setSalaCriada={setSalaCriada}
          setShowModal={setShowModal}
          setNomeSala={setNomeSala}
        />
      )}
    </>
  );
};

export default ModalRoom;
