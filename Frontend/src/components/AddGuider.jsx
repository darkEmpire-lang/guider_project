import { useState } from "react";
import axios from "axios";
import { FaCloudUploadAlt } from "react-icons/fa";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaEdit,
  FaTrash,
  FaTimes,
  FaEye,
  FaPlus,
  FaChartBar,
  FaSignOutAlt,
  FaUserFriends,
  FaFileAlt,
} from "react-icons/fa";

const AddGuider = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nic: "",
    name: "",
    gender: "",
    contactNumber: "",
    email: "",
    location: "",
    experience: "",
    languages: "",
    bio: "",
  });

  const [guiderPic, setGuiderPic] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setGuiderPic(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    if (guiderPic) {
      formDataToSend.append("guiderpic", guiderPic);
    } else {
      setError("Please upload a guider image.");
      setLoading(false);
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/guiders", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/list");
    } catch (err) {
      setError("Failed to add guider. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-10">
      <div className="flex justify-center mb-6">
        <div className="w-40 h-40 rounded-full border-4 border-gray-300 flex items-center justify-center relative bg-gray-100">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <FaCloudUploadAlt className="text-black text-5xl" />
          )}
        </div>
      </div>

      <h2 className="text-2xl font-bold text-center text-black mb-6">
        Add New Guider
      </h2>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="nic"
            value={formData.nic}
            onChange={handleChange}
            placeholder="NIC Number"
            required
            className="border p-3 rounded-md w-full"
          />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="border p-3 rounded-md w-full"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            required
            className="border p-3 rounded-md w-full"
          />
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            required
            className="border p-3 rounded-md w-full"
          />
          <input
            type="number"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            placeholder="Years of Experience"
            required
            className="border p-3 rounded-md w-full"
          />
          <input
            type="text"
            name="languages"
            value={formData.languages}
            onChange={handleChange}
            placeholder="Languages (comma separated)"
            required
            className="border p-3 rounded-md w-full"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="border p-3 rounded-md w-full"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            placeholder="Contact Number"
            required
            className="border p-3 rounded-md w-full"
          />
        </div>

        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          placeholder="Short Bio"
          rows="3"
          required
          className="border p-3 rounded-md w-full"
        ></textarea>

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-md hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Add Guider"}
        </button>
      </form>

      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 w-120 mr-450 mb-80 ">
        {/* <h2 className="text-xl font-bold text-center">Dashboard</h2> */}
        <nav className="flex flex-col space-y-3 mr-80 mt-78 bg-gray-300 w-400 h-200">
          <h2 className="text-xl font-bold text-center mr-4">Dashboard</h2>
          <a
            href="/add"
            className="flex items-center space-x-2 hover:bg-blue-700 p-2 rounded"
          >
            <FaPlus /> <span>Add Guider</span>
          </a>
          <a
            href="/list"
            className="flex items-center space-x-2 hover:bg-blue-700 p-2 rounded"
          >
            <FaUserFriends /> <span>View Guiders</span>
          </a>

          <a
            href="/"
            className="flex items-center space-x-2 hover:bg-blue-700 p-2 rounded"
          >
            <FaUserFriends /> <span>User's View</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-2 hover:bg-blue-700 p-2 rounded"
          >
            <FaFileAlt /> <span>Reports</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-2 hover:bg-blue-700 p-2 rounded"
          >
            <FaChartBar /> <span>Charts</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-2 hover:bg-red-700 p-2 rounded"
          >
            <FaSignOutAlt /> <span>Log Out</span>
          </a>
        </nav>
      </div>
    </div>
  );
};

export default AddGuider;

// GuiderCreated Page
export const GuiderCreated = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-3xl font-bold text-green-600">
        Guider Added Successfully!
      </h2>
      <p className="text-lg mt-2">You can now view the guider in the list.</p>
    </div>
  );
};
