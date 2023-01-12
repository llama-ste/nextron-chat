import { User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

import { onAuthStateChange } from "../common/firebase";
import { IChildrenProps } from "../types/children";

export const AuthContext = createContext<User | null>(null);

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: IChildrenProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChange(setCurrentUser);
  }, []);

  return (
    <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>
  );
};
