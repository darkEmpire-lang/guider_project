import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";

const GuiderList = () => {
  const [guiders, setGuiders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGuiders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/guiders");
        setGuiders(response.data);
      } catch (err) {
        setError("Failed to load guiders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchGuiders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-4xl font-bold text-center text-blue-700 mb-8">
        Meet Our Guiders
      </h2>

      {loading ? (
        <div className="flex justify-center">
          <div className="loader border-t-4 border-blue-500 border-solid rounded-full w-12 h-12 animate-spin"></div>
        </div>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-256">
          {guiders.map((guider) => (
            <div
              key={guider._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl"
            >
              {/* Image Section */}
              <div className="w-full h-64 overflow-hidden rounded-t-2xl">
                <img
                  className="w-full h-120 object-cover object-center transition-transform duration-300 hover:scale-110 mb-8"
                  src={guider.guiderpic}
                  alt={guider.name}
                />
              </div>

              {/* Content Section */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800">
                  {guider.name}
                </h3>
                <p className="text-gray-600 mt-3">
                  <strong>Email:</strong> {guider.email}
                </p>
                <p className="text-gray-600">
                  <strong>Contact:</strong> {guider.contactNumber}
                </p>
                <p className="text-gray-600">
                  <strong>Experience:</strong> {guider.experience} years
                </p>
                <p className="text-gray-600">
                  <strong>Location:</strong> {guider.location}
                </p>
                <p className="text-gray-600">
                  <strong>Languages:</strong> {guider.languages}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GuiderList;
