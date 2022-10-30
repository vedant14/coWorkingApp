import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [authenticatedState, setAuthenticatedState] =
    useState("not-authenticated");

  async function checkUser() {
    const userData = await supabase.auth.getUser();
    if (userData) {
      setCurrentUser(userData.data.user);
    }
  }

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN") {
          setAuthenticatedState("authenticated");
        }
        if (event === "SIGNED_OUT") {
          setAuthenticatedState("not-authenticated");
          setCurrentUser(null);
        }
      }
    );
  }, []);

  useEffect(() => {
    checkUser();
  }, [authenticatedState]);

  let sharedState = {
    currentUser,
  };

  return (
    <AuthContext.Provider value={sharedState}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
