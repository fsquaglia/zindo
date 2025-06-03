// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, connectDatabaseEmulator } from "firebase/database"; //realtime database para los Servicios
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore"; //firestore como BD de colecciones y documentos

// Your web app's Firebase configuration
let firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};
// Initialize Firebase with dynamic configuration
let app;
//if (typeof window !== 'undefined' && window.location.hostname === "localhost") {
if (process.env.NEXT_PUBLIC_FIREBASE_EMULATORS === "emulators") {
  // Use local emulator settings
  const localConfig = {
    ...firebaseConfig,
    databaseURL: "http://localhost:9000/?ns=zindo-9aeea",
  };
  app = initializeApp(localConfig);
  connectFirestoreEmulator(getFirestore(app), "localhost", 8080);
  //connectStorageEmulator(getStorage(app), "127.0.0.1", 9199);
  console.log("Conectado con emuladores");
} else {
  // Use production settings
  app = initializeApp(firebaseConfig);
  console.log("Conectado sin Emuladores");
}

// Initialize Firebase
const realtimeDB = getDatabase(app);
const firestoreDB = getFirestore(app);

export { app, realtimeDB, firestoreDB };
