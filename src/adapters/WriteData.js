// import { set, ref, update } from "firebase/database";
// import { database } from "./firebaseConfig";
// import { v4 as uuidv4 } from "uuid";

// // export function WriteUserData(userId, username, email, status) {
// //   set(ref(database, `Users/${userId}`), {
// //     username: username,
// //     email: email,
// //     online: status,
// //     salaExiste: {
// //       status: false,
// //       nomeSala: `Sala de ${username}`,
// //       codigo: myuuid,
// //       usuariosOnlines: { usuarios: username },
// //       senha: {
// //         possuiSenha: password ? true : false,
// //         senha: password || null,
// //       },
// //     },
// //   });
// //   return null;
// // }

// export function DefineStatusUser(userId, status, displayname, email) {
//   // if (displayname) {
//   //   return update(ref(database, `Users/${userId}`), {
//   //     online: status,
//   //     username: displayname,
//   //     email: email,
//   //   });
//   // } else {
//   return update(ref(database, `Users/${userId}`), {
//     online: status,
//   });
//   // }
// }

// export function WriteRoom(userId, username, password) {
//   let myuuid = uuidv4();
//   return set(ref(database, `Users/${userId}/idRoom`), {});
// }
