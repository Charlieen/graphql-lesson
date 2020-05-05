import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCB3fvh-a-He9slCNxrK4BxdCYxjqJu9yQ",
    authDomain: "eclothing-9c86a.firebaseapp.com",
    databaseURL: "https://eclothing-9c86a.firebaseio.com",
    projectId: "eclothing-9c86a",
    storageBucket: "eclothing-9c86a.appspot.com",
    messagingSenderId: "427978181222",
    appId: "1:427978181222:web:61b1b472d57638167d3ba7"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
