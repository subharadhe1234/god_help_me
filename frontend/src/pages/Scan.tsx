import WebcamComponent from "../components/Webcam";
import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavbar } from "../contexts/NavbarContext";
import { InfinitySpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const demoData = {
  medicines: [
    {
      name: "HYDROXYCHLOROQUINE",
      dosage: "1 gram",
      frequency: "once a week",
      route: "oral",
      special_instructions: "taken only once a week",
      websites: [
        {
          store: "Amazon.in",
          price: "₹649.00",
          link: "https://www.amazon.in/some-link",
          image:
            "https://images.pexels.com/photos/30462129/pexels-photo-30462129/free-photo-of-majestic-himalayan-mountain-landscape.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        },
      ],
    },
    {
      name: "VITAMIN",
      dosage: "50 Mg",
      frequency: "once a day",
      route: "oral",
      special_instructions: "taken daily once",
      websites: [
        {
          store: "Amazon.in",
          price: "₹150.00",
          link: "https://www.amazon.in/some-vitamin-link",
          image:
            "https://images.pexels.com/photos/30326244/pexels-photo-30326244/free-photo-of-classic-car-driving-through-snowy-mountain-landscape.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        },
      ],
    },
  ],
  general_instructions:
    "Practice social distancing, maintain hand hygiene, and wear a mask. Take medications as prescribed.",
};

function Scan() {
  const navigate = useNavigate();
  const { setNavbar } = useNavbar();
  const [capture, setCapture] = useState<boolean>(false);
  const [image, setImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState("");
  // Default location: @22.958723,88.3777435 -> Adisaptagram
  const [location, setLocation] = useState({
    latitude: 22.958723,
    longitude: 88.3777435,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
    // if (file) {
    //   const reader = new FileReader();

    //   reader.onloadend = () => {
    //     if (typeof reader.result === "string") {
    //       setImage(reader.result);
    //     }
    //   };

    //   reader.readAsDataURL(file);
    // }
  };

  const handleSubmit = async () => {
    console.log("Submitting Image");
    console.log(image);
    setIsLoading(true);
    setNavbar(false);
    if (!image) return "No image found!";
    let blob = await fetch(image).then((r) => r.blob());
    const file = new File([blob], "prescription.png", { type: "image/png" });
    const formData = new FormData();
    formData.append("image", file);
    if (location) {
      formData.append("location", JSON.stringify(location));
    }
    try {
      const response = await fetch("http://127.0.0.1:9999/", {
        method: "POST",
        body: formData,
      });
      if (response.status !== 200) {
        throw new Error("File upload unsuccessful!");
      }
      const data = await response.json();
      console.log("Response:", data);
      setNavbar(true);
      setImage("");
      setIsLoading(false);
      // Navigate to result page
      // TODO: change demoData to data
      navigate("/result", { state: { data: demoData } });
    } catch (error) {
      console.error("Upload failed:", error);
      setErrorMessage("Something went wrong! Please try again");
      setNavbar(true);
      setIsLoading(false);
      navigate("/result", { state: { data: demoData } });
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="w-screen h-screen flex items-center justify-center">
          <div className="flex flex-col justify-center items-center">
            <InfinitySpin width="200" color="#4fa94d" />
            <div>Please wait AI is scanning</div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900">
          {capture ? (
            <>
              {/* Back Button Positioned at the Top */}

              {/* Webcam Component */}
              <div className="w-full flex items-center justify-center">
                <WebcamComponent setCapture={setCapture} setImage={setImage} />
                <div className="absolute top-5 left-5">
                  <button
                    className="bg-white px-4 py-2 rounded-lg shadow-md font-semibold text-gray-700 hover:bg-gray-200 transition"
                    onClick={() => setCapture(false)}
                  >
                    <ArrowLeft />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="px-6">
              <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-xl flex flex-col items-center gap-3">
                {/* Image Upload Section */}
                <h2 className="text-2xl font-bold text-gray-800 text-center">
                  Upload Your Prescription
                </h2>
                <input
                  onChange={handleFileChange}
                  type="file"
                  name="image"
                  id="image"
                  accept="image/*"
                  className="border-2 border-gray-300 my-6 px-4 py-2 rounded-lg w-full text-gray-600"
                />
                {image && (
                  <img
                    src={image}
                    alt="Preview"
                    className="h-40 object-cover rounded-lg shadow-lg"
                  />
                )}
                {/* Capture Button */}
                <button
                  className="bg-green-600 hover:bg-green-700 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 w-full"
                  onClick={() => setCapture(true)}
                >
                  Capture Instead
                </button>
                <button
                  className="bg-green-600 hover:bg-green-700 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 w-full disabled:bg-green-300"
                  disabled={image ? false : true}
                  onClick={handleSubmit}
                >
                  Scan with AI
                </button>
                <div className="text-red-500">{errorMessage}</div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Scan;
