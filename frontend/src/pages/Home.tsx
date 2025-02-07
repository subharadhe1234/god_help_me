import { Link } from "react-router";
import Button from "../components/Button";

function Home() {
  return (
    <>
      <nav className="absolute z-10 w-full font-primary text-[2rem] font-black justify-between items-center top-0  p-4 border-b-2 border-gray-300">
        <div className="flex gap-3 tracking-wider">
          <div className="split">
            AUSADHI <span className="text-green-600">MITRA</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
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
        </div>
      </div>
    </>
  );
}

export default Home;
