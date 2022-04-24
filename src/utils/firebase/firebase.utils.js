import {initializeApp} from 'firebase/app';

import {getAuth,signInWithRedirect, signInWithPopup, 
    GoogleAuthProvider,createUserWithEmailAndPassword, signInWithEmailAndPassword,
    signOut, onAuthStateChanged} from 'firebase/auth';

import {getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs} from 'firebase/firestore';

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

  const googleProvider = new GoogleAuthProvider();

  googleProvider.setCustomParameters({
      prompt: "select_account"
  });


  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth,googleProvider);
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth,googleProvider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey,objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);
    objectsToAdd.forEach((object) =>{
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });
    await batch.commit();
    console.log('done');
}

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'catagories');
    const q = query(collectionRef);
  
    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
      const { title, items } = docSnapshot.data();
      acc[title.toLowerCase()] = items;
      return acc;
    }, {});
  
    return categoryMap;
  };

export const createUserDocumentFromAuth = async (userAuth, additionalInformation ={}) =>{
    const userDocRef = doc(db,'user',userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);
    

    if(!userSnapshot.exists()){
        const {displayName,email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef,{
                displayName,email,createdAt, ...additionalInformation
            });
        } catch (error) {
            console.log(error);
        }

    }

    return userDocRef;
}


export const createAuthUserWithEmailAndPassword = async(email, password) =>{
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth,email,password);
}

export const SignInAuthUserWithEmailAndPassword = async(email, password) =>{
    if(!email || !password) return;
    return await signInWithEmailAndPassword(auth,email,password);
}


export const signOutUser =async () =>await signOut(auth);

export const onAuthStateChangedListener =  (callback) => onAuthStateChanged(auth,callback);