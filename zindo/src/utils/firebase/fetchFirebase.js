import { collection, addDoc } from "firebase/firestore";
import { firestoreDB, realtimeDB } from "./firebaseConfig";

// !FIRESTORE

// Crear un nuevo documento en Firestore (SDK v9+)
export const createDocument = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(firestoreDB, collectionName), data);
    return { ...data, docRefId: docRef.id }; // Retorna el ID del documento creado junto con los datos
  } catch (error) {
    console.error("Error creating document:", error);
    throw error;
  }
};
