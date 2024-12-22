import React, { createContext, useState, useEffect, useContext } from "react";
import { auth } from "../firebase/firebase.config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { PuffLoader } from "react-spinners";


export const AuthContext = createContext();


export const useAuth = () => {
  return useContext(AuthContext);
};


export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });


    return () => unsubscribe();
  }, []);


  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error during logout: ", error);
    }
  };


  return (
    <AuthContext.Provider value={{ user, logout, loading }}>
      {loading ? (
      
        <div className="flex justify-center items-center min-h-screen">
          <PuffLoader color="#3498db" size={60} />
        </div>
      ) : (
      
        children
      )}
    </AuthContext.Provider>
  );
};
