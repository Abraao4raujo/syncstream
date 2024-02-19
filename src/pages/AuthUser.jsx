import React from "react";
import styled from "styled-components";
import BgImageSrc from "../assets/capas-de-filmes.png";
import LogoSrc from "../assets/logoSemFundo.png";

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

      <Img className="modal-logo" src={LogoSrc} alt="Logo" />
      <div className="imagemDeFundo">
        <BgImage src={BgImageSrc} alt="imagem de fundo" />
      </div>
    </div>
  );
};

export default AuthUser;
