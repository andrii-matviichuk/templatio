import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  connectFirestoreEmulator,
  enableMultiTabIndexedDbPersistence,
} from 'firebase/firestore';
import {
  getAuth,
  connectAuthEmulator,
  Auth,
  // signInWithCredential,
  // EmailAuthProvider
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'templatio-b0b46.firebaseapp.com',
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: 'templatio-b0b46',
  storageBucket: 'templatio-b0b46.appspot.com',
  messagingSenderId: '643052677753',
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: 'G-0ZGZ1ZX8ZZ',
};

let app;
let auth: Auth;
let firestore;

const initFirebase = async () => {
  try {
    app = initializeApp(firebaseConfig);
    firestore = getFirestore(app);
    auth = getAuth(app);

    if (process.env.NODE_ENV !== 'production') {
      connectAuthEmulator(auth, 'http://localhost:9099');
      connectFirestoreEmulator(firestore, 'localhost', 8080);
      enableMultiTabIndexedDbPersistence(firestore);

      // signInWithCredential(
      //   auth,
      //   EmailAuthProvider.credential('john@doe.com', '123123')
      // )
    }
  } catch (err) {
    console.error(err);
    return err;
  }
};

export { initFirebase, app, auth };
