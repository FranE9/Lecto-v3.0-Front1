import React, { createContext, useState } from "react";
import jwt_decode from "jwt-decode";

export const AuthContext = createContext();

const initialState = {
  isLogged: false,
  token: "",
  username: '',
  userId: '',
};

export const AuthProvider = ({ children }) => {
  const storedState = JSON.parse(localStorage.getItem("lecto-user"));

  const [user, setUser] = useState(storedState || initialState);

  const updateUserInfo = (token) => {
    if (!token) {
      localStorage.removeItem("lecto-user");
      setUser(initialState);
      return;
    }

    const decoded = jwt_decode(token);

    const newUserInfo = {
      isLogged: Boolean(token),
      token,
      username: decoded?.username || "",
      userId: decoded?.user_id || ""
    };
    localStorage.setItem("lecto-user", JSON.stringify(newUserInfo));
    setUser(newUserInfo);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        updateUserInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
