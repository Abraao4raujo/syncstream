import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from "./firebaseConfig";
import { WriteUserData } from "./WriteData";

const newUser = async ({ email, password, displayName }) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    updateProfile(userCredential.user, { displayName: displayName });

    WriteUserData(displayName, displayName, email);

    // if (user) {
      // window.location.href = "/home";
    // }

    return userCredential;
  } catch (error) {
    console.log(error);
  }
};

export default newUser;
