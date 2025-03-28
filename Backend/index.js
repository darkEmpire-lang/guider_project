import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import connectCloudinary from './config/cloudinary.js';
import guiderRoutes from "./routes/guiderRoutes.js";

import bodyParser from 'body-parser'; // Use 'import' for body-parser



// Initialize the Express app
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/guiders", guiderRoutes);


// Port configuration
const port = process.env.PORT || 5000;



// Middleware
app.use(express.json());
 app.use(bodyParser.json()); // Parse JSON bodies
 app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Connect Cloudinary
connectCloudinary();



// Root endpoint
app.get('/', (req, res) => {
  res.send('API WORKING');
});

// MongoDB connection
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error('Mongo URI is missing! Please add it to your .env file.');
  process.exit(1);
}

mongoose
  .connect(mongoURI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('Database connection error:', err);
    process.exit(1); // Exit the app if DB connection fails
  });

// Start the server
app.listen(port, () => console.log('Server is running on port: ' + port));
