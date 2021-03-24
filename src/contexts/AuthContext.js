import React, { useState, useContext, useEffect } from "react";
import { auth } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  async function signin(email, password) {
    await auth.signInWithEmailAndPassword(email, password);
  }

  async function signup(email, password, name) {
    const userCredential = await auth.createUserWithEmailAndPassword(
      email,
      password
    );

    userCredential.user.updateProfile({
      displayName: name,
    });
  }

  function logout() {
    auth.signOut();
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log("HERE IN AUTH STATE CHANGED", user);
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signin,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
