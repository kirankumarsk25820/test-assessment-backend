import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

// Routes
import authRoutes from './routes/auth.routes.js';
import testRoutes from './routes/tests.routes.js';
import questionRoutes from './routes/questions.routes.js';
import codingRoutes from './routes/coding.routes.js';

// Load env variables
dotenv.config();

// Connect to MongoDB Atlas
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/tests', testRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/coding', codingRoutes);

// Default route
app.get('/', (req, res) => {
    res.send('Pushpagiri Assessment Platform API is running 🚀');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
