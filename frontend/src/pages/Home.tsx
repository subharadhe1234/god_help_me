import { Link } from "react-router";
import Button from "../components/Button";
import logo from "../assets/google.svg";
import { useState } from "react";

function Home() {
  const [isLogged, setIsLogged] = useState(false);
  return (
    <>
      <nav className="absolute z-10 w-full font-primary text-[2rem] font-black justify-between items-center top-0  p-4 border-b-2 border-gray-300">
        <div className="flex gap-3 tracking-wider">
          <div className="split">
            AUSADHI <span className="text-green-600">MITRA</span>
          </div>
        </div>
      </nav>


      <div>
        <div className="flex flex-col h-screen items-center justify-center px-4">
          <div className="text-4xl font-extrabold text-center leading-tight max-w-xs">
            <h1>
              Find the{" "}
              <span className="text-white bg-green-600 px-3 py-1 rounded-xl shadow-md">
                right
              </span>{" "}
              <span className="text-white bg-gradient-to-r from-green-500 to-green-700 px-3 py-1 rounded-xl shadow-md">
                medicine
              </span>{" "}
              for you
            </h1>
          </div>
          <div className="mt-6">
            <Link to="/scan">
              <Button title="Scan Prescription" />
            </Link>
          </div>
          {!isLogged && (
            <div className="flex flex-col items-center justify-center bg-white mt-16 p-6 rounded-2xl shadow-lg w-full max-w-sm">
              {/* Login Text */}
              <p className="text-center font-semibold text-lg text-gray-800">
                To save your scan, please login with Google
              </p>

              {/* Google Login Button */}
              <button className="flex items-center justify-center gap-3 bg-gray-100 hover:bg-gray-200 transition-all text-gray-700 font-semibold px-5 py-3 rounded-lg shadow-md mt-4 w-full">
                <img src={logo} alt="Google" className="w-6 h-6" />
                Login With Google
              </button>
            </div>
          )}


        </div>
      </div>
    </>
  );
}

export default Home;
