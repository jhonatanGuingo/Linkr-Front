import React from "react";
import { AuthContext } from "./AuthContext.js";


export default function AuthProvider({ children }) {
    const saveToken = (data) => {
      localStorage.setItem("token", data.token);
    };
    const saveImage = (data) => {
      localStorage.setItem("image", data.image)
    }
    const saveUserId = (data) => {
      localStorage.setItem("userId", data.userId)
    }
    return (
      <AuthContext.Provider value={{ saveToken, saveImage, saveUserId }}>
        {children}
      </AuthContext.Provider>
    );
  }