import { BrowserRouter, Routes, Route } from "react-router";
// Pages
import Home from "./pages/Home";
import Scan from "./pages/Scan";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";

// Provider
import { NavbarProvider } from "./contexts/NavbarContext";

function App() {
  return (
    <>
      <NavbarProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/scan" element={<Scan />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          <Navbar />
        </BrowserRouter>
      </NavbarProvider>
    </>
  );
}

export default App;
