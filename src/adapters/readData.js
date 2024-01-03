import { ref, child, get } from "firebase/database";
import { database } from "./firebaseConfig";

export async function readUserData() {
  const dbRef = ref(database);
  try {
    const snapshot = await get(child(dbRef, `Users/`));
    if (snapshot.exists()) {
      return await snapshot.val();
    } else {
      console.log("No data available");
      return null;
    }
  } catch (error) {
    console.error(error);
  }
}
