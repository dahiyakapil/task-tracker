import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from "morgan"
import { connectDB } from './config/connectDB.js';
import taskRouter from './routes/taskRoutes.js';
import { errorHandler, notFound } from './utils/errorHandler.js';



dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(morgan("dev"));   
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Task Tracker API is running',
        version: '1.0.0'
    });
});

app.use('/api/tasks', taskRouter);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Connect Database
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port http://localhost:${PORT}`);
        })
    })
    .catch((error) => {
        console.error("Failed to connect to the database:", error);
        process.exit(1);
    })
