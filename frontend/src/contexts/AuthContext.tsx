import { createContext, ReactNode, useState, useContext } from "react";

interface userDetailsType {
  name: string;
  email: string;
  profilePic: string;
  exp: number;
  token: string;
}

interface AuthContextTypes {
  isLoggedIn: boolean;
  setIsLoggedIn: (state: boolean) => void;
  userDetails: userDetailsType | null;
  setUserDetails: (details: userDetailsType | null) => void;
}
const AuthContext = createContext<AuthContextTypes | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState<userDetailsType | null>(null);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, userDetails, setUserDetails }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useNavbar must be within a provider!");
  }
  return context;
};
