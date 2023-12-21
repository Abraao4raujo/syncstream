import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";

const newUser = async ({ email, password }) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log(userCredential);
    window.location.href = "/home";
  } catch (error) {
    console.log(error);
  }
};

export default newUser;
