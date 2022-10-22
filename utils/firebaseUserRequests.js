import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithRedirect,
  GoogleAuthProvider,
  getRedirectResult,
  signOut,
} from "firebase/auth";
import Router from "next/router";
import { auth } from "./firebaseConfig";
import { createUserProfile } from "./firebasePostRequests";

export async function userSignUpEmail(
  firstName,
  lastName,
  userEmail,
  password,
  setError
) {
  createUserWithEmailAndPassword(auth, userEmail, password)
    .then((userCredential) => {
      createUserProfile(
        userCredential.user.uid,
        firstName,
        lastName,
        userEmail,
        setError
      );
    })
    .catch((error) => {
      setError(error.message);
    });
}

export async function userLoginEmail(userEmail, password, setError) {
  await signInWithEmailAndPassword(auth, userEmail, password)
    .then(() => Router.push("/dashboard"))
    .catch((error) => {
      setError(error.message);
    });
}

export async function signOutUser() {
  signOut(auth)
    .then(() => {
      Router.push("/");
    })
    .catch((error) => {
      console.error("Error", error.message);
    });
}

// export async function signInWithGoogle() {
//   signInWithRedirect(auth, provider);
// }

// export async function getGoogleAuthResults(setError) {
//   getRedirectResult(auth)
//     .then((result) => {
//       // This gives you a Google Access Token. You can use it to access Google APIs.
//       // const userCredential = GoogleAuthProvider.credentialFromResult(result);
//       // const token = userCredential.accessToken;
//       // The signed-in user info.
//       if (result) {
//         const user = result.user;
//         createUserProfile(
//           user.uid,
//           user.displayName.split(" ")[0],
//           user.displayName.split(" ")[1] || " ",
//           user.email,
//           true,
//           setError
//         );
//       }
//     })
//     .catch((error) => {
//       console.error("ERROR", error);
//     });
// }
