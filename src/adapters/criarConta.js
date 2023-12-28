import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "./firebaseConfig";

const newUser = async ({ email, password, displayName }) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    updateProfile(userCredential.user, { displayName: displayName });
    window.location.href = "/home";
    return userCredential;
  } catch (error) {
    console.log(error);
  }
};

export default newUser;
