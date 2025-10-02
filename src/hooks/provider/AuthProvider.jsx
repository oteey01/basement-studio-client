import { createContext, useContext } from "react";
import { useProfile } from "../api/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const { data: user, isLoading } = useProfile();

  //(user);
  return (
    <AuthContext.Provider
      value={{ user, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () =>
  useContext(AuthContext);
