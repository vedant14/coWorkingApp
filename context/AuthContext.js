import { useEffect, useState, createContext, useContext } from "react";
import { supabase } from "../utils/supabaseClient";
const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [uniqueId, setUniqueId] = useState(null);
  const [authenticatedState, setAuthenticatedState] =
    useState("not-authenticated");
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        handleAuthChange(event, session);
        if (event === "SIGNED_IN") {
          setUniqueId(session.user.id);
          setCurrentUser(session.user);
          setAuthenticatedState("authenticated");
        }
        if (event === "SIGNED_OUT") {
          setCurrentUser(null);
          setUniqueId(null);
          setAuthenticatedState("not-authenticated");
        }
      }
    );
  }, []);

  async function handleAuthChange(event, session) {
    await fetch("/api/auth", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      credentials: "same-origin",
      body: JSON.stringify({ event, session }),
    });
  }

  let sharedState = {
    currentUser,
    uniqueId,
  };
  return (
    <AuthContext.Provider value={sharedState}>{children}</AuthContext.Provider>
  );
}
