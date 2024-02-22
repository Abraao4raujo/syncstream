import React from "react";
import styled from "styled-components";
import bgImageSrc from "../../public/capaFilmes.png";
import logoSemFundo from "../../public/logoSemFundo.png";
import { Outlet } from "react-router-dom";

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
const AuthUser = () => {
  return (
    <div>
      <Outlet />
      <Img className="modal-logo" src={logoSemFundo} alt="Logo" />
      <div className="imagemDeFundo">
        <BgImage src={bgImageSrc} alt="imagem de fundo" />
      </div>
    </div>
  );
};

export default AuthUser;
