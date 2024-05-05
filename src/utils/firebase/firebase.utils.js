
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAWH3lY5LIg0XAn6Ne-5wtEpcWDYHtXs8k",
    authDomain: "crwn-clothing-db-4c76a.firebaseapp.com",
    projectId: "crwn-clothing-db-4c76a",
    storageBucket: "crwn-clothing-db-4c76a.appspot.com",
    messagingSenderId: "238830623776",
    appId: "1:238830623776:web:3776df490c2b54b3ad3045"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);