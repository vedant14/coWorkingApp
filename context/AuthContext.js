import { useEffect, useState, createContext, useContext } from "react";
import { auth } from "../utils/firebaseConfig";
import { getUserProfile } from "../utils/firebaseGetRequest";
const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [uniqueId, setUniqueId] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [authenticatedState, setAuthenticatedState] =
    useState("not-authenticated");

  async function checkUser() {
    const user = await auth.currentUser;
    if (user) {
      getUserProfile(setCurrentUser, user.uid);
      setAccessToken(user.accessToken);
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUniqueId(user.uid);
        setAuthenticatedState("authenticated");
      } else {
        setCurrentUser(null);
        setUniqueId(null);
        setAccessToken(null);
        setAuthenticatedState("not-authenticated");
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    checkUser();
  }, [authenticatedState]);

  let sharedState = {
    currentUser,
    uniqueId,
  };
  return (
    <AuthContext.Provider value={sharedState}>{children}</AuthContext.Provider>
  );
}
