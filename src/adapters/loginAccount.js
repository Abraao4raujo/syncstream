import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";

const loginAccount = async ({ email, password, displayName }) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
      displayName
    );
    window.location.href = "/home";
    return userCredential;
  } catch (error) {
    console.log(error);
    window.alert("Email ou senha incorreta!");
  }
};

export default loginAccount;
