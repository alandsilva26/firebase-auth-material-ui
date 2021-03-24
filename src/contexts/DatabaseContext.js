import React, { useEffect, useState, useContext, createContext } from "react";
import { useAuth } from "./AuthContext";
import { db } from "../firebase";
const DatabaseContext = createContext();

export function useDb() {
  return useContext(DatabaseContext);
}

export function DatabaseProvider({ children }) {
  const [userData, setUserData] = useState();

  const { currentUser } = useAuth();

  //   async function getData() {
  //     const test = await db.ref("test").get();

  //     console.log(test.val());
  //   }

  async function createUser(email, fname, lname, uid) {
    db.ref("users/" + uid).set({
      email: email,
      fname: fname,
      lname: lname,
    });
  }

  useEffect(() => {});

  const value = {
    userData,
    createUser,
  };
  return (
    <DatabaseContext.Provider value={value}>
      {children}
    </DatabaseContext.Provider>
  );
}
