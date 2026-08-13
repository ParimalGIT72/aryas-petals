const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Load Environment Variables
dotenv.config();

// Initialize Database Connection
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Allowed Origins for CORS (Local Development + Deployed Vercel Frontends)
const allowedOrigins = [
  'https://aryas-petals.vercel.app',
  'https://aryas-petals-c1og.vercel.app',
  'http://aryas-petals-c1og.vercel.app',
  'http://localhost:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
  process.env.CLIENT_URL,
  process.env.ADMIN_URL
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (mobile apps, curl, Postman)
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        origin.endsWith('.vercel.app') ||
        process.env.NODE_ENV !== 'production'
      ) {
        return callback(null, true);
      }
      return callback(new Error(`CORS Policy: Access denied for origin ${origin}`));
    },
    credentials: true
  })
);

// Standard API Routes Setup (/api/...)
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/custom-requests', require('./routes/customRequestRoutes'));
app.use('/api/admin', require('./routes/statsRoutes'));

// Route Aliases for Base Domain Requests (protects against missing /api prefix in VITE_API_URL)
app.use('/auth', require('./routes/authRoutes'));
app.use('/products', require('./routes/productRoutes'));
app.use('/orders', require('./routes/orderRoutes'));
app.use('/custom-requests', require('./routes/customRequestRoutes'));

// Healthcheck Endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    name: "Arya's Petals Backend API",
    status: 'Healthy',
    timestamp: new Date().toISOString()
  });
});

// Global Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`[Server Running] Arya's Petals API listening on port ${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n[Server Error] Port ${PORT} is already in use by another process.`);
    console.error(`If another process is running on port ${PORT}, stop it or change PORT in server/.env\n`);
  } else {
    console.error('[Server Error]', err);
  }
});
