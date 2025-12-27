import { createContext, useContext, useState } from "react";
import { getFromStorage, saveToStorage } from "../Utils/storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getFromStorage("user"));

  const login = (email) => {
    setUser(email);
    saveToStorage("user", email);
  };

  const logout = () => {
    setUser(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
