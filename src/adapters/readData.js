import { getDatabase, ref, child, get } from "firebase/database";

export async function readUserData(displayName) {
  const dbRef = ref(getDatabase());
  try {
    const snapshot = await get(child(dbRef, `Users/${displayName}`));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No data available");
    }
  } catch (error) {
    console.error(error);
  }
}
