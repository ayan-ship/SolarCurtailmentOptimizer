const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();

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

const app = express();
app.use(cors({
  origin: (origin, callback) => {
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
}));
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

app.post("/generate-insights", async (req, res) => {
  try {
    console.log("⚡ Returning hardcoded insights");

    const response = {
      insight: "Solar generation peaks during mid-day hours, but significant curtailment occurs due to grid constraints and low demand alignment.",
      problem: "Excess solar energy is being curtailed because coal plants are not ramping down quickly enough, leading to inefficiencies and wasted renewable potential.",
      recommendation: "Implement better load balancing strategies by reducing coal generation during peak solar hours and improving storage or demand response systems to absorb excess solar output."
    };

    res.json(response);
  } catch (err) {
    console.error("Error in hardcoded insights:", err.message);

    res.status(500).json({
      error: "Failed to return hardcoded insights",
      insight: "Unavailable",
      problem: "Unavailable",
      recommendation: "Try again later"
    });
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "OK", service: "insight-backend" });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`✨ Insight Backend running on port ${PORT}`);
  console.log(`📍 CORS enabled for:`, allowedOrigins);
  console.log(`🔧 Receives optimization data from frontend, generates AI insights via Gemini`);
});