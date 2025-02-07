import { BrowserRouter, Routes, Route } from "react-router";
// Pages
import Home from "./pages/Home";
import Scan from "./pages/Scan";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scan" element={<Scan />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Navbar />
      </BrowserRouter>
    </>
  );
}

export default App;
