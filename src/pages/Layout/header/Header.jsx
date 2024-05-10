import { NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import styled from "styled-components";
import { auth } from "../../../adapters/firebaseConfig";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const HeaderDiv = styled.div`
  width: 100%;
  height: 65px;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-evenly;
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

export const Header = ({ setOpenMenu, optionMenu }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [nomeUsuario, setNomeUsuario] = useState(); //Dados do usuario que está acessando o site

  // VERIFIFA SE O USUARIO ESTÁ LOGADO
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setNomeUsuario(user.displayName);
        setIsConnected(true);
      } else {
        setIsConnected(false);
      }
    });
  }, []);

  return (
    <HeaderDiv className="absolute z-10">
      {optionMenu && (
        <div className={`menuSection ${optionMenu && "open"}`}>
          <div className="menu">
            <nav className="menuNav">
              <ul className="menuLists">
                <NavLink
                  className="menuList"
                  onClick={() => {
                    setOpenMenu(false);
                  }}
                  to={"/series"}
                >
                  SÉRIES
                </NavLink>

                <NavLink
                  className="menuList"
                  onClick={() => {
                    setOpenMenu(false);
                  }}
                  to={"/movies"}
                >
                  FILMES
                </NavLink>
              </ul>
            </nav>
          </div>
        </div>
      )}
      <Nav>
        <NavLink
          className="navLink"
          to={isConnected ? "/home" : "/"}
          style={({ isActive }) => {
            return {
              color: isActive && "#fff",
              fontSize: "1.5rem",
            };
          }}
        >
          SYNCSTREAM
        </NavLink>

        <NavLink
          className="navLink"
          to={isConnected ? "/series" : "/"}
          style={({ isActive }) => {
            return {
              color: isActive ? "rgb(20, 184, 148)" : "#fff",
            };
          }}
        >
          SÉRIES
        </NavLink>
        <NavLink
          className="navLink"
          to={isConnected ? "/movies" : "/"}
          style={({ isActive }) => {
            return {
              color: isActive ? "rgb(20, 184, 148)" : "#fff",
            };
          }}
        >
          FILMES
        </NavLink>
        {isConnected && (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage
                  src="https://cdn-icons-png.flaticon.com/512/4999/4999070.png"
                  style={{ cursor: "pointer" }}
                />
                <AvatarFallback>{nomeUsuario.substr(0, 2)}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem style={{ cursor: "pointer" }}>
                Perfil
              </DropdownMenuItem>
              <DropdownMenuItem
                style={{ cursor: "pointer" }}
                onClick={(e) => e.preventDefault()}
              >
                <AlertDialog>
                  <AlertDialogTrigger>Desconectar</AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Você tem certeza que deseja desconectar da sua conta?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Essa ação vai desconectar sua conta, e você terá que
                        fazer o login novamente.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={(e) => {
                          e.preventDefault();
                          signOut(auth);
                          setIsConnected(false);
                        }}
                      >
                        Desconectar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </Nav>
    </HeaderDiv>
  );
};
