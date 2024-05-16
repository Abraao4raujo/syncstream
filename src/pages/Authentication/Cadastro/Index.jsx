import "../style.css";
import { Link } from "react-router-dom";
import { auth } from "../../../adapters/firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const Cadastro = () => {
  // cadastrar usuario
  const handleRegister = (e) => {
    e.preventDefault();
    let displayname = e.target[0].value;
    let email = e.target[1].value;
    let password = e.target[2].value;

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        await updateProfile(userCredential.user, { displayName: displayname });
        window.location.href = "/home";
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        alert("Não foi possivel cadastrar o usuário");
      });
  };

  return (
    <div className="modal-container z-10">
      <h1 className="modal-title">Cadastro</h1>
      <form onSubmit={handleRegister}>
        <h2 className="title_input">Nome</h2>
        <input
          className="modal-input"
          type="text"
          placeholder="Digite seu nome"
        />
        <h2 className="title_input">Email</h2>
        <input
          className="modal-input"
          type="email"
          placeholder="Digite seu email"
        />
        <h2 className="title_input">Senha</h2>
        <input
          className="modal-input"
          type="password"
          placeholder="*********"
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
