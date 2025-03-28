import mongoose from "mongoose";

const guiderSchema = new mongoose.Schema({
    nic: { type: String, required: true },
    name: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    contactNumber: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    location: { type: String, required: true },
    experience: { type: Number, required: true },
    languages: { type: [String], required: true },
    bio: { type: String, required: true },
    guiderpic: { type: String, required: true } // Cloudinary image URL
});

const Guider = mongoose.model("Guider", guiderSchema);
export default Guider;
