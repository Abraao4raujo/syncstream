import { set, ref, update } from "firebase/database";
import { database } from "./firebaseConfig";

export function WriteUserData(userId, username, email, status) {
  set(ref(database, `Users/${userId}`), {
    username: username,
    email: email,
    online: status,
  });
  return null;
}

export function DefineStatusUser(userId, status, displayname, email) {
  if (displayname) {
    return update(ref(database, `Users/${userId}`), {
      online: status,
      username: displayname,
      email: email,
    });
  } else {
    return update(ref(database, `Users/${userId}`), {
      online: status,
    });
  }
}
