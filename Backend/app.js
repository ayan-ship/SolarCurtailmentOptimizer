require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { main } = require('./hash');

// CORS Configuration - Allow multiple origins
const allowedOrigins = [
    'https://solarcurtailmentoptimizer.vercel.app',
    'https://www.solarcurtailmentoptimizer.vercel.app',
    'https://solar-curtailment-optimizer.vercel.app',
    'https://www.solar-curtailment-optimizer.vercel.app',
    'http://localhost:5173',
    'http://localhost:3000',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:3000',
    process.env.FRONTEND_URL
].filter(Boolean);

const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests with no origin (mobile apps, curl requests, etc)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.warn('CORS blocked:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200,
    maxAge: 3600
};

app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const slashRoutes = require('./route/slash.routes')
app.use('/', slashRoutes)

const connectDB = require('./config/mongoose.config');
connectDB();

app.listen(8080, () => {
    console.log('Server running on port 8080');
    console.log('CORS enabled for:', allowedOrigins);
});
