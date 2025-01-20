import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDb from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import listenerRoutes from './routes/listener/index.js';

// App Config
const app = express();
const port = process.env.PORT || 4000;
connectDb(); 
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors()); 

// API Endpoints
app.get('/', (req, res) => {
    res.send("API is running...");
});

listenerRoutes(app);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});