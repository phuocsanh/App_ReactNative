import React, { createContext, useState, useEffect } from "react";
import { onSignUp, onSignIn, onSignOut } from "./UserService";
import { getAuth, onAuthStateChanged } from "firebase9/auth";
export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const { children } = props;
  const [user, setUser] = useState(null);
  useEffect(() => {
    const auth = getAuth();
    const subscribe = onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u);
      } else {
        setUser(null);
      }
    });
    return subscribe;
  }, []);

  const onLogin = async (email, password) => {
    try {
      await onSignIn(email, password);
    } catch (error) {
      console.log("Lỗi đăng nhập" + error);
    }
  };

  const onLogout = async () => {
    try {
      await onSignOut();
    } catch (error) {
      console.log(error);
    }
  };
  const onRegister = async (email, password) => {
    try {
      await onSignUp(email, password);
    } catch (error) {
      console.log("Lỗi đăng kí" + error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        isLogin: !!user,
        onLogin,
        onLogout,
        onRegister,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
