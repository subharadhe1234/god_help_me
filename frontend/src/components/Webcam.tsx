import { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import { useNavbar } from "../contexts/NavbarContext";
import { SwitchCamera, Zap, ZapOff } from "lucide-react";

function WebcamComponent({
  setCapture,
  setImage,
}: {
  setCapture: React.Dispatch<React.SetStateAction<boolean>>;
  setImage: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const { setNavbar } = useNavbar();
  const webcamRef = useRef<Webcam | null>(null);
  const [currImage, setCurrImage] = useState<string | null>(null);
  const [cameraMode, setCameraMode] = useState<"environment" | "user">(
    "environment"
  );
  const [flashlightOn, setFlashlightOn] = useState<boolean>(false);

  const toggleFlashlight = async () => {
    if (webcamRef.current?.stream) {
      const [track] = webcamRef.current.stream.getVideoTracks();
      const capabilities = track.getCapabilities();

      if ("torch" in capabilities) {
        await track.applyConstraints({
          advanced: [{ torch: !flashlightOn }] as any,
        });
        setFlashlightOn((prev) => !prev);
      } else {
        alert("Flashlight not supported on this device.");
      }
    }
  };

  const capture = () => {
    // if (webcamRef.current) {
    //   const imageSrc = webcamRef.current.getScreenshot();
    //   if (imageSrc) {
    //     setImage(imageSrc);
    //   }
    // }
    if (webcamRef.current) {
      const video = webcamRef.current.video;
      const canvas = document.createElement("canvas");
      canvas.width = 1080;
      canvas.height = 1920;
      const ctx = canvas.getContext("2d");
      if (video) {
        ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
      }

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const blobUrl = URL.createObjectURL(blob);
            setCurrImage(blobUrl);
          }
        },
        "image/png",
        1
      );
    }
  };

  const reset = () => setCurrImage(null);

  const keep = () => {
    setImage(currImage);
    setCapture(false);
  };

  useEffect(() => {
    setNavbar(false);
    return () => setNavbar(true);
  }, []);

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center bg-black">
      {currImage ? (
        <div className="relative w-full h-[75%] flex items-center justify-center">
          <img
            src={currImage}
            alt="Captured"
            className="w-full h-full object-cover rounded-lg"
          />
          {/* Reset Button */}
          <div className="absolute top-5 left-5 space-x-4">
            <button
              className="bg-white text-gray-900 px-4 py-2 rounded-lg shadow-md font-semibold hover:bg-gray-200 transition"
              onClick={reset}
            >
              Retake
            </button>
            <button
              className="bg-white text-gray-900 px-4 py-2 rounded-lg shadow-md font-semibold hover:bg-gray-200 transition"
              onClick={keep}
            >
              Keep
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Webcam Preview */}
          <Webcam
            ref={webcamRef}
            videoConstraints={{
              facingMode: cameraMode,
              width: { ideal: 1920 },
              height: { ideal: 1080 },
              advanced: [{ torch: false }] as any,
            }}
            screenshotFormat="image/png"
            className="absolute top-0 left-0 w-full h-[75%] object-cover"
            screenshotQuality={1}
          />

          {/* Capture Button Below Camera */}
          <div className="absolute bottom-12 flex items-center justify-center w-full">
            <button
              className="absolute left-20"
              onClick={() =>
                setCameraMode((prev) =>
                  prev === "environment" ? "user" : "environment"
                )
              }
            >
              <SwitchCamera color="white" size={30} />
            </button>
            <button
              className="w-16 h-16 bg-white rounded-full border-4 border-gray-700 shadow-lg hover:scale-105 transition-all duration-300 active:scale-95"
              onClick={capture}
            />
            <button onClick={toggleFlashlight} className="absolute right-20">
              {flashlightOn ? (
                <ZapOff color="white" size={30} />
              ) : (
                <Zap color="white" size={30} />
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default WebcamComponent;
