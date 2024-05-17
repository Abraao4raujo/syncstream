import { NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import styled from "styled-components";
import { auth } from "../../adapters/firebaseConfig";
import AvatarMenu from "../AvatarMenu";

const HeaderDiv = styled.div`
  width: 100%;
  height: 65px;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 100%;
  background: linear-gradient(#222, transparent);
  z-index: 1;
  @media (max-width: 700px) {
    justify-content: space-between;
  }
`;

export const Header = () => {
  const [user, setUser] = useState({
    displayName: "",
    online: false,
  });

  // VERIFIFA SE O USUARIO ESTÁ LOGADO
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          displayName: user.displayName,
          online: true,
        });
      }
    });
  }, []);

  return (
    <HeaderDiv className="z-10 fixed">
      <Nav className="justify-between px-10">
        <div className="flex items-center">
          <NavLink
            className="text-2xl text-white text-blue-800 font-bold"
            to="/home"
          >
            SYNCSTREAM
          </NavLink>

          <NavLink
            className="text-1xl text-white font-medium capitalize ml-10"
            to={user.online ? "/series" : "/"}
            style={({ isActive }) => {
              return {
                fontWeight: isActive ? "bold" : "500",
              };
            }}
          >
            séries
          </NavLink>
          <NavLink
            className="text-1xl text-white font-medium capitalize ml-10"
            to={user.online ? "/movie" : "/"}
            style={({ isActive }) => {
              return {
                fontWeight: isActive ? "bold" : "500",
              };
            }}
          >
            filmes
          </NavLink>
        </div>
        {user.online && <AvatarMenu user={user} />}
      </Nav>
    </HeaderDiv>
  );
};
