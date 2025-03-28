import { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaTimes,FaEye } from "react-icons/fa";
import React from "react";

const ManageGuiders = () => {
    const [guiders, setGuiders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [viewMode, setViewMode] = useState(false);
    const [currentGuider, setCurrentGuider] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        fetchGuiders();
    }, []);

    const fetchGuiders = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/guiders");
            setGuiders(response.data);
        } catch (err) {
            setError("Failed to load guiders.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this guider?")) return;
        try {
            await axios.delete(`http://localhost:5000/api/guiders/${id}`);
            setGuiders(guiders.filter(guider => guider._id !== id));
        } catch (err) {
            alert("Failed to delete guider.");
        }
    };

    const handleEdit = (guider) => {
        setEditMode(true);
        setCurrentGuider({ ...guider, languages: guider.languages.join(", ") });
        setSelectedImage(null);
    };

    const handleView = (guider) => {
        setViewMode(true);
        setCurrentGuider(guider);
    };


    const handleUpdate = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("nic", currentGuider.nic);
        formData.append("name", currentGuider.name);
        formData.append("gender", currentGuider.gender);
        formData.append("contactNumber", currentGuider.contactNumber);
        formData.append("email", currentGuider.email);
        formData.append("location", currentGuider.location);
        formData.append("experience", currentGuider.experience);
        formData.append("languages", currentGuider.languages);
        formData.append("bio", currentGuider.bio);

        if (selectedImage) {
            formData.append("guiderpic", selectedImage);
        }

        try {
            await axios.put(`http://localhost:5000/api/guiders/${currentGuider._id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            fetchGuiders(); // Refresh the list
            setEditMode(false);
            setCurrentGuider(null);
        } catch (err) {
            alert("Failed to update guider.");
        }
    };

    const handleChange = (e) => {
        setCurrentGuider({ ...currentGuider, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
            <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">Manage Guiders</h2>
            {error && <p className="text-red-500 text-center">{error}</p>}
            {loading ? <p className="text-center">Loading...</p> : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {guiders.map(guider => (
                        <div key={guider._id} className="bg-gray-100 p-4 rounded-lg shadow-md relative">
                            <img src={guider.guiderpic} alt={guider.name} className="w-24 h-24 object-cover rounded-full mx-auto mb-3" />
                            <h3 className="text-xl font-semibold text-center">{guider.name}</h3>
                            <p className="text-gray-600 text-center">{guider.email}</p>
                            <div className="flex justify-center space-x-4 mt-3">
                                <button className="text-green-500 text-lg" onClick={() => handleEdit(guider)}> <FaEdit /> </button>
                                <button className="text-red-500 text-lg" onClick={() => handleDelete(guider._id)}> <FaTrash /> </button>
                                <button className="text-black text-lg" onClick={() => handleView(guider)}> <FaEye /> </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {editMode && (
                <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 w-128 ml-300">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <div className="flex justify-between mb-4">
                            <h3 className="text-xl font-bold">Edit Guider</h3>
                            <button className="text-red-500" onClick={() => setEditMode(false)}><FaTimes /></button>
                        </div>
                        <form onSubmit={handleUpdate} className="space-y-3">
                            <input type="text" name="nic" value={currentGuider.nic} onChange={handleChange} placeholder="NIC" required className="border p-2 rounded-md w-full" />
                            <input type="text" name="name" value={currentGuider.name} onChange={handleChange} placeholder="Full Name" required className="border p-2 rounded-md w-full" />
                            <input type="text" name="gender" value={currentGuider.gender} onChange={handleChange} placeholder="Gender" required className="border p-2 rounded-md w-full" />
                            <input type="text" name="contactNumber" value={currentGuider.contactNumber} onChange={handleChange} placeholder="Contact Number" required className="border p-2 rounded-md w-full" />
                            <input type="email" name="email" value={currentGuider.email} onChange={handleChange} placeholder="Email Address" required className="border p-2 rounded-md w-full" />
                            <input type="text" name="location" value={currentGuider.location} onChange={handleChange} placeholder="Location" required className="border p-2 rounded-md w-full" />
                            <input type="text" name="experience" value={currentGuider.experience} onChange={handleChange} placeholder="Experience" required className="border p-2 rounded-md w-full" />
                            <input type="text" name="languages" value={currentGuider.languages} onChange={handleChange} placeholder="Languages (comma separated)" required className="border p-2 rounded-md w-full" />
                            <textarea name="bio" value={currentGuider.bio} onChange={handleChange} placeholder="Bio" required className="border p-2 rounded-md w-full"></textarea>
                            <input type="file" accept="image/*" onChange={handleFileChange} className="border p-2 rounded-md w-full" />
                            {currentGuider.guiderpic && <img src={currentGuider.guiderpic} alt="Guider" className="w-20 h-20 rounded-md mx-auto mt-2" />}
                            <button type="submit" className="w-full bg-black text-white py-2 rounded-md">Update Guider</button>
                        </form>
                    </div>
                </div>
            )}

{viewMode && (
                <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 w-128 ml-300">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <div className="flex justify-between mb-4">
                            <h3 className="text-xl font-bold">Guider Details</h3>
                            <button className="text-red-500" onClick={() => setViewMode(false)}><FaTimes /></button>
                        </div>
                        <img src={currentGuider.guiderpic} alt="Guider" className="w-32 h-32 rounded-full mx-auto mb-3" />
                        <p><strong>Name:</strong> {currentGuider.name}</p>
                        <p><strong>NIC:</strong> {currentGuider.nic}</p>
                        <p><strong>Gender:</strong> {currentGuider.gender}</p>
                        <p><strong>Contact:</strong> {currentGuider.contactNumber}</p>
                        <p><strong>Email:</strong> {currentGuider.email}</p>
                        <p><strong>Location:</strong> {currentGuider.location}</p>
                        <p><strong>Experience:</strong> {currentGuider.experience} years</p>
                        <p><strong>Languages:</strong> {currentGuider.languages}</p>
                        <p><strong>Bio:</strong> {currentGuider.bio}</p>
                    </div>
                </div>
            )}













        </div>





    );
};

export default ManageGuiders;
