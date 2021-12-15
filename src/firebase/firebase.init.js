import { initializeApp } from "firebase/app";
import FirebaseConfig from "./firebase.config";

const FirebaseAPP = () => initializeApp(FirebaseConfig);

export default FirebaseAPP;
