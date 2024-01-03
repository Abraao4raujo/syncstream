import { set, ref } from "firebase/database";
import { database } from "./firebaseConfig";

export default function WriteUserData(userId, username, email) {
  set(ref(database, `Users/${userId}`), {
    username: username,
    email: email,
    online: true,
  });
  return null;
}
