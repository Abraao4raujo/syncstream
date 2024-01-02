import { getDatabase, set, ref } from "firebase/database";

export const WriteUserData = (displayName, email) => {
  const db = getDatabase();
  return set(ref(db, `Users/${email}`), {
    username: displayName,
    email: email,
    online: true,
  });
};
