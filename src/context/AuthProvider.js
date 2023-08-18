import React from "react";
import { AuthContext } from "./AuthContext.js";


export default function AuthProvider({ children }) {
    const saveToken = (data) => {
      localStorage.setItem("token", data.token);
    };
    const saveImage = (data) => {
      localStorage.setItem("image", data.image)
    }
  
    return (
      <AuthContext.Provider value={{ saveToken, saveImage }}>
        {children}
      </AuthContext.Provider>
    );
  }