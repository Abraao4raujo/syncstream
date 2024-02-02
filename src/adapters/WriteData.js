import { database as db } from "./firebaseConfig";
import { v4 as uuidv4 } from "uuid";
import { ref, set } from "firebase/database";

export function writeRoom(userId, username) {
  set(ref(db, `Users/${userId}`), {
    username: username,
    room: {
      codeRoom: uuidv4(),
      guest: [username],
      hasRoom: true,
    },
  });
  console.log("Room written");
}