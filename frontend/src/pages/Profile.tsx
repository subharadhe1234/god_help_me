import React from "react";
import { Download } from 'lucide-react';

function Profile() {
  const data = {
    "history": [
      {
        "img": "https://images.pexels.com/photos/29090361/pexels-photo-29090361/free-photo-of-autumn-birch-forest-with-golden-leaves.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "date": "2021-09-01",
        "download": "https://www.google.com",
      },
      {
        "img": "https://images.pexels.com/photos/29090361/pexels-photo-29090361/free-photo-of-autumn-birch-forest-with-golden-leaves.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "date": "2021-09-01",
        "download": "https://www.google.com",
      },
    ]
  }
  const user_Details = {
    name: "John Doe",
    Age: 25,
    Email: "xyz@gmail.com",
    Phone: 1234567890,
    Address: "123, ABC Street, XYZ City",
    image:
      "https://images.pexels.com/photos/29719977/pexels-photo-29719977/free-photo-of-woman-walking-dog-in-vibrant-city-street.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Profile Card */}
      <div className="bg-white p-6 rounded-xl shadow-lg flex sm:flex-row items-center gap-6 w-full max-w-md sm:max-w-lg lg:max-w-2xl">
        {/* User Image */}
        <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden outline-1 outline-offset-2">
          <img
            src={user_Details.image}
            alt="User"
            className="w-full h-full object-cover"
          />
        </div>

        {/* User Details */}
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-bold text-gray-900">{user_Details.name}</h2>
          <p className="text-gray-600 mt-1"><strong>Age</strong>: {user_Details.Age}</p>
          <p className="text-gray-600">📧<strong>Email</strong>: {user_Details.Email}</p>
          <p className="text-gray-600">📞<strong>Phone No.</strong>: {user_Details.Phone}</p>
          <p className="text-gray-600">🏠<strong>Address</strong>: {user_Details.Address}</p>

          {/* Hoverable Edit Button */}
          <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-all">
            Edit Profile
          </button>
        </div>
      </div>
      {/* History */}
      <div className="mt-6">
        <h1 className="font-black text-3xl">History</h1>
        <div className="grid grid-cols-1 gap-3 mt-10">
          {data.history.map((medicine: any, index: any) => (
            <div
              key={index}
              className="bg-white p-4 rounded-xl shadow-lg flex items-center gap-4"
            >
              
              <img
                src={medicine.img}
                alt="Prescription"
                className="w-24 h-24 object-cover rounded-lg border"
              />

              {/* Prescription Details */}
              <div className="flex-1">
                <h2 className="text-lg font-bold text-gray-900">Prescription</h2>
                <p className="text-gray-600 text-sm">📅 <strong>Date</strong>: {medicine.date}</p>
              </div>

              {/* Download Button */}
              <a
                href={medicine.download}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-all text-sm"
              >
                <Download />
              </a>
            </div>
          ))}
        </div>
        <div className="bg-white flex rounded-lg shadow-lg p-6 justify-center mb-20 mt-10">Hope You Will Get Soon 😊</div>
      </div>

    </div>
  );
}

export default Profile;
