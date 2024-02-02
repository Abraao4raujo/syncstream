import { ref, child, get, update, onValue } from "firebase/database";
import { database } from "./firebaseConfig";
const dbRef = ref(database);

export async function readHasRoom(idUser) {
  const snapshot = await get(child(dbRef, `Users/${idUser}`));
  if (snapshot.exists()) {
    return await snapshot.val();
  } else {
    console.log("No data available");
    return null;
  }
}

// export async function checkRoomExist(idUser) {
//   try {
//     const snapshot = await get(
//       child(dbRef, `Users/${idUser}/idRoom/salaExiste`)
//     );
//     if (snapshot.exists()) {
//       return true;
//     } else {
//       return false;
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }

// export async function joinRoom(idUser, newUsername) {
//   return update(ref(database, `Users/${idUser}/idRoom/usuariosOnline`), {
//     username: newUsername,
//   });
// }
