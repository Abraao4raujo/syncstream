import "../styles/paginaAutenticacao.css";
import { Link } from "react-router-dom";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../adapters/firebaseConfig";
import { useEffect, useState } from "react";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  // verifica se o usuario ainda está conectado, toda vez que a pagina é carregada
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        window.location.href = "/home";
      }
    });
  }, []);

  // login com email e senha
  function handleLogin(email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Usuario cadastrado com sucesso!", user);
        window.location.href = "/home";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("Email ou senha inválido!");
      });
  }

  // login com google
  function handleSignInGoogle() {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        setEmail(result.user.email);
        setPassword(result.user.providerId);
        setUsername(result.user.displayName);
      })
      .then(() => {
        window.location.href = "/home";
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="modal-container">
      <h1 className="modal-title">Login</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin(email, password);
        }}
      >
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
          onChange={({ target }) => {
            setPassword(target.value);
          }}
        />

        <div className="options-login">
          <input type="submit" value="Entrar" className="modal-button" />

          <label className="label-options">
            Não possui uma conta?{" "}
            <Link to="/register" className="link">
              Criar conta
            </Link>
          </label>

          <div className="loginGoogle">
            <button
              className="btnGoogle"
              onClick={(e) => {
                e.preventDefault();
                handleSignInGoogle();
              }}
            >
              <FaGoogle style={{ marginRight: "5px" }} /> Entrar com Google
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
