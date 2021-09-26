import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.config";
import {
  getAuth,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider
} from "firebase/auth";

// export const initializeLoginFramework = () => {
//     const firebaseApp = initializeApp(firebaseConfig); 
//     const auth = getAuth(firebaseApp);
// }
const firebaseApp = initializeApp(firebaseConfig); 
const auth = getAuth(firebaseApp);

function handleGoogleSignIn() {
    const googleProvider = new GoogleAuthProvider();
    // const auth = getAuth();
    return signInWithPopup(auth, googleProvider)
      .then((result) => {
        const { displayName, email, photoURL } = result.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
          success: true
        };
        return signedInUser;
        // console.log(result.user);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.message);
      });
  };


const handleSignOut = () => {
    const auth = getAuth();
    return signOut(auth)
      .then(() => {
        const signedOutUser = {
          isSignedIn: false,
          name: "",
          email: "",
          photo: "",
        };
        return signedOutUser;
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
        console.log(error.message);
      });
  };

export const createUserWithEmailPassword  = (name, email, password) =>{
    // const auth = getAuth();
    return createUserWithEmailAndPassword(auth, email, password)
    .then(res => {
      const newUserInfo = res.user;
      newUserInfo.error = "";
      newUserInfo.isSuccess = true;
      updateUserName(name);
      return newUserInfo;
      // ...
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.isSuccess = false;
      return newUserInfo;
    });
}

export const signInWithEmailPassword = (email, password) =>{
    const auth = getAuth();
      return signInWithEmailAndPassword(auth, email, password)
        .then((res) => {
          const newUserInfo = res.user;
          newUserInfo.error = "";
          newUserInfo.isSuccess = true;
          return newUserInfo; 
        })
        .catch((error) => {
          const newUserInfo = {};
          newUserInfo.error = error.message;
          newUserInfo.isSuccess = false;
          return newUserInfo;
        });
}

const updateUserName = name => {
    // const auth = getAuth();
    // console.log(name);
    updateProfile(auth.currentUser, {
      displayName: name
    }).then(() => {
      
      console.log("user name updated successfully");
    }).catch((error) => {
      console.log(error);
    });
  }

export {
  handleGoogleSignIn,
  handleSignOut,
}