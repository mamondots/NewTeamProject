import { collection } from "firebase/firestore";
import { firestoreDB } from "./forestore.config";

export const usersCollectionRef = collection(firestoreDB, "users");
export const messagesCollectionRef = collection(firestoreDB, "messages");
