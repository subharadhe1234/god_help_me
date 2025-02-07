import WebcamComponent from "../components/Webcam";
import { useState, useEffect } from "react";

import { ArrowLeft,SendHorizontal } from "lucide-react";
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
          "title": "Tolol-am 25MG 10TAB",
          "link": "https://www.google.com/url?url=https://www.secondmedic.com/app/view-product/tolol-am-25mg-10tab-81152%3Fsrsltid%3DAfmBOor6gBlUhfZKkmos48pJI1b1j1rSyicbeZTdVQqrvA7QKC5Retm8dqA&rct=j&q=&esrc=s&opi=95576897&sa=U&ved=0ahUKEwjZnYDijrKLAxVfV2wGHXcwDtUQ1SkIpQYoAA&usg=AOvVaw2MW4fQAVIeaugiJSLNw4XO",
          "price": 106.1,
          "image": "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRoZ1a-u2qXSaRDtt07imJ8qmhAINze5-VDtH6oueYJhn5ryQOkog0i_vkgoTUsS5UyGg2nOocowcosgMmFvvdRk3sxTgS0EsyZ9_goqZm7GfbKac0OqYWh&usqp=CAE"
        },
        {
          "title": "Tolol-am 25MG 10TAB",
          "link": "https://www.google.com/url?url=https://www.secondmedic.com/app/view-product/tolol-am-25mg-10tab-81152%3Fsrsltid%3DAfmBOor6gBlUhfZKkmos48pJI1b1j1rSyicbeZTdVQqrvA7QKC5Retm8dqA&rct=j&q=&esrc=s&opi=95576897&sa=U&ved=0ahUKEwjZnYDijrKLAxVfV2wGHXcwDtUQ1SkIpQYoAA&usg=AOvVaw2MW4fQAVIeaugiJSLNw4XO",
          "price": 106.1,
          "image": "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRoZ1a-u2qXSaRDtt07imJ8qmhAINze5-VDtH6oueYJhn5ryQOkog0i_vkgoTUsS5UyGg2nOocowcosgMmFvvdRk3sxTgS0EsyZ9_goqZm7GfbKac0OqYWh&usqp=CAE"
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
          "title": "PIXAFLO 2.5",
          "link": "https://www.google.com/url?url=https://www.microchemist.in/product/30244008/PIXAFLO-2-5%3Futm_source%3DGMC%26srsltid%3DAfmBOop_NSZkXrAKKoHxBHVkCIq3Ei6nqVdSmaSFfuwGVIwTFrvDeVV4-JE&rct=j&q=&esrc=s&opi=95576897&sa=U&ved=0ahUKEwjZnYDijrKLAxVfV2wGHXcwDtUQ1SkImQYoAA&usg=AOvVaw1_XZmfCAPuGjXvKMaK-Wyo",
          "price": 127.5,
          "image": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRL9s91UrnEkIbS8RfxPAwA9v3UEZrkwIl7k9eCPe-LL0tWLs8dG4X-1KcnIK-LHiyZGX1yht-HJ812hSeC5tZIiQtGvLVSDpRWniHHQLsIDtQtd06kAjQ4&usqp=CAE"
        },
        {
          "title": "PIXAFLO 2.5",
          "link": "https://www.google.com/url?url=https://www.microchemist.in/product/30244008/PIXAFLO-2-5%3Futm_source%3DGMC%26srsltid%3DAfmBOop_NSZkXrAKKoHxBHVkCIq3Ei6nqVdSmaSFfuwGVIwTFrvDeVV4-JE&rct=j&q=&esrc=s&opi=95576897&sa=U&ved=0ahUKEwjZnYDijrKLAxVfV2wGHXcwDtUQ1SkImQYoAA&usg=AOvVaw1_XZmfCAPuGjXvKMaK-Wyo",
          "price": 127.5,
          "image": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRL9s91UrnEkIbS8RfxPAwA9v3UEZrkwIl7k9eCPe-LL0tWLs8dG4X-1KcnIK-LHiyZGX1yht-HJ812hSeC5tZIiQtGvLVSDpRWniHHQLsIDtQtd06kAjQ4&usqp=CAE"
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
            <div className="animate-pulse">Please wait AI is scanning</div>
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
                  <div className="flex items-center justify-center gap-2">
                  Scan with AI 
                  <SendHorizontal strokeWidth={2.5} />
                  </div>
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
