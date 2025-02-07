import { createContext, ReactNode, useState, useContext } from "react";

interface NavbarContextType {
  showNavbar: boolean;
  setNavbar: (state: boolean) => void;
}
const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

export const NavbarProvider = ({ children }: { children: ReactNode }) => {
  const [showNavbar, setShowNavbar] = useState(true);
  const setNavbar = (state: boolean) => {
    setShowNavbar(state);
  };

  return (
    <NavbarContext.Provider value={{ showNavbar, setNavbar }}>
      {children}
    </NavbarContext.Provider>
  );
};

export const useNavbar = () => {
  const context = useContext(NavbarContext);
  if (!context) {
    throw new Error("useNavbar must be within a provider!");
  }
  return context;
};
