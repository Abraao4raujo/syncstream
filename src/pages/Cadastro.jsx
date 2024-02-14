import "../styles/paginaAutenticacao.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "../adapters/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

const Cadastro = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [refreshPage, setRefreshPage] = useState();

  // cadastrar usuario
  function handleRegister(username, email, password) {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        await updateProfile(userCredential.user, { displayName: username });
        window.location.href = "/home";
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        alert("Não foi possivel cadastrar o usuário");
      })
      .finally(() => {
        setRefreshPage(true);
      });
  }

  return (
    <div className="modal-container">
      <h1 className="modal-title">Cadastro</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleRegister(username, email, password);
        }}
      >
        <h2 className="title_input">Nome</h2>
        <input
          className="modal-input"
          type="text"
          placeholder="Digite seu nome"
          onChange={({ target }) => setUsername(target.value)}
        />
        <h2 className="title_input">Email</h2>
        <input
          className="modal-input"
          type="email"
          placeholder="Digite seu email"
          onChange={({ target }) => setEmail(target.value)}
        />
        <h2 className="title_input">Senha</h2>
        <input
          className="modal-input"
          type="password"
          placeholder="*********"
          onChange={({ target }) => setPassword(target.value)}
        />
        <div className="options-login">
          <input type="submit" value="Cadastrar" className="modal-button" />

          <label>
            Já possui uma conta?
            <Link to="/" className="link">
              Faça login
            </Link>
          </label>
        </div>
      </form>
    </div>
  );
};

export default Cadastro;
