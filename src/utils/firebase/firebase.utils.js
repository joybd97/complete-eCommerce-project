import {initializeApp} from 'firebase/app';

import {getAuth,signInWithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth';

import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAwjldq0IiCAp6aiSd24DtbuQdS6IpBNG0",
    authDomain: "crown-clothing-db-cbf09.firebaseapp.com",
    projectId: "crown-clothing-db-cbf09",
    storageBucket: "crown-clothing-db-cbf09.appspot.com",
    messagingSenderId: "985219992904",
    appId: "1:985219992904:web:6d9df5e66e3538383eb77d"
  };
  
  // Initialize Firebase
  const firebaseapp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
      prompt: "select_account"
  });


  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth,provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) =>{
    const userDocRef = doc(db,'user',userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);
    

    if(!userSnapshot.exists()){
        const {displayName,email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef,{
                displayName,email,createdAt
            });
        } catch (error) {
            console.log(error);
        }

    }

    return userDocRef;
}
