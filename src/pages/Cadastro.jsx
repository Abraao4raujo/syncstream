import "../styles/paginaAutenticacao.css";
import newUser from "../adapters/criarConta";
import { Link } from "react-router-dom";
import { useState } from "react";

const Cadastro = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const CreatingNewUser = {
    displayName: displayName,
    email: email,
    password: password,
  };

  return (
    <div className="telaTotal">
      <div className="imagemDeFundo">
        <img src="../../public/img/capas-de-filmes.png" alt="imagem de fundo" />
      </div>
      <div className="modal-container">
        <h1 className="modal-title">Cadastro</h1>
        <h2 className="title_input">Nome</h2>
        <input
          className="modal-input"
          type="text"
          placeholder="Digite seu nome"
          onChange={({ target }) => setDisplayName(target.value)}
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
          <button
            className="modal-button"
            onClick={() => newUser(CreatingNewUser)}
          >
            Cadastrar
          </button>
          <label>
            Já possui uma conta?
            <Link to="/" className="link">
              Faça login
            </Link>
          </label>
        </div>
        <img
          className="modal-logo"
          src="../img/logo-sem-fundo.png"
          alt="Logo"
        />
      </div>
    </div>
  );
};

export default Cadastro;
