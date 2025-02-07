import { BrowserRouter, Routes, Route } from "react-router";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
// Pages
import Home from "./pages/Home";
import Scan from "./pages/Scan";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import Result from "./pages/Result";
// Provider
import { NavbarProvider } from "./contexts/NavbarContext";
import PrintComponent from "./pages/Demo";

import { useAuth } from "./contexts/AuthContext";

function App() {
  const { setIsLoggedIn, setUserDetails } = useAuth();
  useEffect(() => {
    const credentials = localStorage.getItem("token");
    if (credentials) {
      setIsLoggedIn(true);
      // console.log(credentials);
      if (credentials) {
        localStorage.setItem("token", credentials);
        const userDetails: any = jwtDecode(credentials);
        setUserDetails({
          name: userDetails.name,
          email: userDetails.email,
          profilePic: userDetails.picture,
          exp: userDetails.exp,
          token: credentials,
        });
      }
    }
  }, []);

  return (
    <>
      <NavbarProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/scan" element={<Scan />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/result" element={<Result />} />
            <Route path="/PrintComponent" element={<PrintComponent />} />
          </Routes>
          <Navbar />
        </BrowserRouter>
      </NavbarProvider>
    </>
  );
}

export default App;
