import "../styles/loginPageStyles.css";
import { Link } from "react-router-dom";
import loginAccount from "../adapters/loginAccount";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const user = {
    email: email,
    password: password,
  };
  async function handleLogin(event) {
    event.preventDefault();
    await loginAccount(user);
  }

  return (
    <div className="modal-container">
      <form>
        <h1 className="modal-title">Login</h1>
        <h2 className="title_input">Email</h2>
        <input
          className="modal-input"
          type="text"
          placeholder="Digite seu email"
          id="loginEmail"
          onChange={({ target }) => {
            setEmail(target.value);
          }}
        />
        <h2 className="title_input">Senha</h2>
        <input
          className="modal-input"
          type="password"
          placeholder="*********"
          id="loginPassword"
          onChange={({ target }) => {
            setPassword(target.value);
          }}
        />

        <label className="checkbox-keep-connected">
          <input type="checkbox" />
          Manter-se conectado
        </label>

        <div className="options-login">
          <button className="modal-button" onClick={handleLogin}>
            Entrar
          </button>

          <label className="label-options">Não possui uma conta?</label>
          <Link to="/register" className="link">
            Criar conta
          </Link>
        </div>
      </form>
      <img className="modal-logo" src="../img/logo-sem-fundo.png" alt="Logo" />
    </div>
  );
};

export default Login;
