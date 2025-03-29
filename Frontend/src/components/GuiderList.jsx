import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";

const GuiderList = () => {
  const [guiders, setGuiders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchGuiders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/guiders");
        setGuiders(response.data);

        // Extract unique locations
        const uniqueLocations = [...new Set(response.data.map((guider) => guider.location))];
        setLocations(uniqueLocations);
      } catch (err) {
        setError("Failed to load guiders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchGuiders();
  }, []);

  // Filter guiders based on the search term, location, and experience
  const filteredGuiders = guiders.filter((guider) => {
    const matchesName = guider.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = selectedLocation ? guider.location.toLowerCase() === selectedLocation.toLowerCase() : true;
    const matchesExperience = selectedExperience ? guider.experience >= selectedExperience : true;

    return matchesName && matchesLocation && matchesExperience;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-4xl font-bold text-center text-black mb-8">
        Meet Our Guiders
      </h2>

      {/* Search Bar */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search by name..."
          className="p-2 rounded-lg border border-gray-300 w-80"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Filters */}
      <div className="mb-6 flex justify-center space-x-4">
        {/* Location Filter */}
        <select
          className="p-2 rounded-lg border border-gray-300"
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
        >
          <option value="">Select Location</option>
          {locations.map((location, index) => (
            <option key={index} value={location}>
              {location}
            </option>
          ))}
        </select>

        {/* Experience Filter */}
        <select
          className="p-2 rounded-lg border border-gray-300"
          value={selectedExperience}
          onChange={(e) => setSelectedExperience(e.target.value)}
        >
          <option value="">Select Experience</option>
          <option value="1">1+ years</option>
          <option value="3">3+ years</option>
          <option value="5">5+ years</option>
          <option value="10">10+ years</option>
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center">
          <div className="loader border-t-4 border-blue-500 border-solid rounded-full w-12 h-12 animate-spin"></div>
        </div>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-center mx-auto w-350">
          {filteredGuiders.length > 0 ? (
            filteredGuiders.map((guider) => (
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
                  <h3 className="text-2xl font-bold text-red-800">{guider.name}</h3>
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

                <button className="text-lg text-white bg-black ml-28 rounded-lg mb-4 p-2 font-bold">Book Now</button>




              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No guiders found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default GuiderList;
