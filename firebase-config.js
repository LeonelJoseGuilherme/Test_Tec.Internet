import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDTyPL4FyKn3EFGwCyH1Br8n9D6LyF8yik",
    authDomain: "leonel-work.firebaseapp.com",
    projectId: "leonel-work",
    storageBucket: "leonel-work.appspot.com",
    messagingSenderId: "147500877900",
    appId: "1:147500877900:web:dad69166cecd15c8060ce9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };