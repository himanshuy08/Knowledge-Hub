import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBvTHsJ5ILE4xkiIC7Gqw4cX01CV83D2S0",
  authDomain: "knowledge-hub-ded09.firebaseapp.com",
  projectId: "knowledge-hub-ded09",
  storageBucket: "knowledge-hub-ded09.appspot.com",
  messagingSenderId: "291169708073",
  appId: "1:291169708073:web:cafd2d5283d809fd615438"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Get Firebase auth instance
const auth = getAuth(app);

// Create Google auth provider instance
const googleProvider = new GoogleAuthProvider();

const storage = getStorage(app);
const database = getDatabase(app);

export { auth, googleProvider,storage,database };
