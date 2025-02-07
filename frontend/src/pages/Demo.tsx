import { useLocation } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PrescriptionPDF from "../components/PrescriptionPdf"; // PDF Component

const Result = () => {
  const location = useLocation();
  const { data } = location.state || {};

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center gap-6">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Prescription
        </h1>
        <p className="mt-2 text-gray-600">Patient: John Doe</p>
        <p className="text-gray-600">Medicine: Paracetamol 500mg</p>
        <p className="text-gray-600">Dosage: Twice daily</p>
      </div>

      {/* Download PDF Button */}
      <PDFDownloadLink
        document={<PrescriptionPDF data={data} />}
        fileName="prescription.pdf"
        className="mt-6 px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        {({ loading }) => (loading ? "Generating PDF..." : "Download as PDF")}
      </PDFDownloadLink>
    </div>
  );
};

export default Result;
