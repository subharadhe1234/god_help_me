import { useLocation } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PrescriptionPDF from "../components/PrescriptionPdf";
import { useState, useEffect } from "react";
import { get_medicine_links, get_location } from "../api";

function toSentenceCase(str: string) {
  if (!str) return ""; // Handle empty strings
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

const Result = () => {
  const [linkErrorMessage, setLinkErrorMessage] = useState("");
  const [locationErrorMessage, setLocationErrorMessage] = useState("");
  const [nearbyLocations, setNearbyLocations] = useState([]);
  const location = useLocation();
  const { data } = location.state || {};

  // Track which medicine's dropdown is open
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  // Default location: @22.958723,88.3777435 -> Adisaptagram
  const [geoLocation, setGeoLocation] = useState({
    latitude: 22.958723,
    longitude: 88.3777435,
  });

  const handleMedicineLinks = async (e: any) => {
    if (e.target.id && e.target.name) {
      setOpenDropdown(
        openDropdown === Number(e.target.id) ? null : Number(e.target.id)
      );
      console.log(openDropdown, Number(e.target.id));
      try {
        const linkData = await get_medicine_links(
          toSentenceCase(e.target.name)
        );
        data.medicines[e.target.id].websites = linkData.medicines;
      } catch (err) {
        console.error("Medicine links cannot be fetched: ", err);
        setLinkErrorMessage("Medicine links could not be fetched!");
      }
    }
  };

  const handleLocationLinks = async () => {
    try {
      const locations = await get_location(geoLocation);
      setNearbyLocations(locations);
    } catch (err) {
      console.error("Error while fetching locations: ", err);
      setLocationErrorMessage("Nearby medical shops could not be fetched!");
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGeoLocation({
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
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col gap-6">
      <span className="bg-white p-4 rounded-xl shadow-md text-gray-800 text-center font-bold text-3xl">
        Results
      </span>

      <div className="bg-white p-4 rounded-xl shadow-md text-gray-800 text-center font-medium">
        <strong className="underline underline-offset-2">
          General Instructions{" "}
        </strong>
        : {data.general_instructions}
      </div>

      <div className="grid grid-cols-1 gap-6">
        {data.medicines.map((medicine: any, index: number) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold text-green-700">
              {medicine.name}
            </h2>
            <p className="text-gray-700">
              <strong>Dosage:</strong> {medicine.dosage}
            </p>
            <p className="text-gray-700">
              <strong>Frequency:</strong> {medicine.frequency}
            </p>
            <p className="text-gray-700">
              <strong>Route:</strong> {medicine.route}
            </p>
            <p className="text-gray-700">
              <strong>Instructions:</strong> {medicine.special_instructions}
            </p>

            {/* Dropdown Button */}
            <button
              onClick={(e) => handleMedicineLinks(e)}
              id={index.toString()}
              name={medicine.name}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
            >
              {openDropdown === index ? "Hide Links" : "Show Links"}
            </button>

            {/* Dropdown List */}
            {openDropdown === index && linkErrorMessage !== "" ? (
              <div className="my-4 text-red-500">{linkErrorMessage}</div>
            ) : (
              ""
            )}
            {openDropdown === index && (
              <div className="mt-3 border rounded-lg shadow-md bg-white p-4">
                {medicine.websites.length > 0 ? (
                  <ul className="space-y-3">
                    {medicine.websites.map((website: any, idx: number) => (
                      <li
                        key={idx}
                        className="flex items-center justify-between border-b pb-2"
                      >
                        <img
                          src={
                            website.image || "https://via.placeholder.com/50"
                          }
                          alt={website.title || "No Image"}
                          className="w-12 h-12 rounded-md object-cover"
                        />
                        <div className="flex-1 ml-4">
                          <p className="text-gray-900 font-semibold">
                            {website.title || "Unknown Product"}
                          </p>
                          <p className="text-green-700 font-bold">
                            Rs.{website.price}
                          </p>
                        </div>
                        <a
                          href={website.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition text-sm"
                        >
                          Buy Now
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 text-center">
                    No links available
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Find nearby locations */}
      <button
        className="mt-6 px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition self-center"
        onClick={handleLocationLinks}
      >
        Find medical shops near you
      </button>
      {locationErrorMessage !== "" && nearbyLocations.length === 0 ? (
        <div className="text-center text-red-500">{locationErrorMessage}</div>
      ) : (
        ""
      )}
      {nearbyLocations.length !== 0 && (
        <div>
          {nearbyLocations.map((loc: any, idx) => (
            <div key={idx}>{loc.name}</div>
          ))}
        </div>
      )}

      {/* Download PDF Button */}
      <PDFDownloadLink
        document={<PrescriptionPDF data={data} />}
        fileName="prescription.pdf"
        className="mt-6 px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition self-center mb-20"
      >
        {({ loading }) => (loading ? "Generating PDF..." : "Download as PDF")}
      </PDFDownloadLink>

      <footer className="bg-white p-4 rounded-xl shadow-md text-gray-800 text-center font-medium mt-auto mb-20">
        <p>Hope you get well soon! 😊</p>
      </footer>
    </div>
  );
};

export default Result;
