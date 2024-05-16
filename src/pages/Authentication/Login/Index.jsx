import "../style.css";
import { Link } from "react-router-dom";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "@/adapters/firebaseConfig";
import { useEffect } from "react";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
  // verifica se usuario logado
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        window.location.href = "/home";
      }
    });
  }, []);

  // login com email e senha
  const handleLogin = (e) => {
    e.preventDefault();
    let email = e.target[0].value;
    let password = e.target[1].value;

    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log("usuario logado:" + userCredential);
          window.location.href = "/home";
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert("Email ou senha inválido!");
        });
    }
  };

  // login com google
  const handleSignInGoogle = (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then(() => {
        window.location.href = "/home";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="modal-container z-10">
      <h1 className="modal-title">Login</h1>
      <form onSubmit={handleLogin}>
        <h2 className="title_input">Email</h2>
        <input
          className="modal-input"
          type="text"
          placeholder="Digite seu email"
        />
        <h2 className="title_input">Senha</h2>
        <input
          className="modal-input"
          type="password"
          placeholder="*********"
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
            <button className="btnGoogle" onClick={handleSignInGoogle}>
              <FaGoogle style={{ marginRight: "5px" }} /> Entrar com Google
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
