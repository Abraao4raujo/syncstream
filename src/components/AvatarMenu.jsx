import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { auth } from "../adapters/firebaseConfig";
import { signOut } from "firebase/auth";

const AvatarMenu = ({ user }) => {
  function desconectarUsuario() {
    user.online = false;
    signOut(auth);
    window.location.href = "/";
  }

  return (
    <DropdownMenu style={{ cursor: "pointer" }}>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src="https://cdn-icons-png.flaticon.com/512/4999/4999070.png" />
          <AvatarFallback>{user.displayName.substr(0, 2)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{user.displayName}</DropdownMenuLabel>

        <DropdownMenuItem
          onClick={desconectarUsuario}
          style={{ cursor: "pointer" }}
        >
          Desconectar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AvatarMenu;
