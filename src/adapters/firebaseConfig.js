import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDMsmozeY1ybThnEjAJJzFRvjeCLI-Br9E",
  authDomain: "syncstream-285bb.firebaseapp.com",
  projectId: "syncstream-285bb",
  storageBucket: "syncstream-285bb.appspot.com",
  messagingSenderId: "638889967854",
  appId: "1:638889967854:web:88b6676b15ef861be273ff",
  measurementId: "G-Z71ED8M4WF",
  databaseURL: `https://${import.meta.env.VITE_DATABASE_NAME}.firebaseio.com`,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
