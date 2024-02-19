import React from "react";
import styled from "styled-components";
const Img = styled.img`
  width: 100px;
  margin-top: auto;
  position: absolute;
  bottom: 0;
  right: 0;
`;
const BgImage = styled.img`
  width: 100%;
  margin-top: auto;
  overflow: hidden;
  height: 100dvh;
  background-size: contain;
  object-fit: cover;
  width: 100%;
`;
const AuthUser = ({ children }) => {
  return (
    <div>
      {children}

      <Img className="modal-logo" src="/img/logoSemFundo.png" alt="Logo" />
      <div className="imagemDeFundo">
        <BgImage src="/img/capas-de-filmes.png" alt="imagem de fundo" />
      </div>
    </div>
  );
};

export default AuthUser;
