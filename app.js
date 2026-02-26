const express = require('express');
const cors = require('cors');
require('dotenv').config();

const heroRoutes = require('./src/routes/heroRoutes');     // dedicated hero routes
const adminRoutes = require('./src/routes/adminRoutes');   // keep your admin routes
const aboutRoutes = require('./src/routes/aboutRoutes');      // ← added
const amenitiesRoutes = require('./src/routes/amenitiesRoutes');  // ← added
const constructionUpdatesRoutes = require('./src/routes/constructionUpdatesRoutes');  // ← added
const faqsRoutes = require('./src/routes/faqsRoutes');              // ← added
const floorPlansRoutes = require('./src/routes/floorPlansRoutes');  // ← added


const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/hero', heroRoutes);          // Hero section only
app.use('/api/admin', adminRoutes);        // Admin login etc.
app.use('/api/about-project', aboutRoutes);           // ← added
app.use('/api/amenities', amenitiesRoutes);           // ← added
app.use('/api/construction-updates', constructionUpdatesRoutes);      // ← added
app.use('/api/faqs', faqsRoutes);                           // ← added
app.use('/api/floor-plans', floorPlansRoutes);           // ← added


// Root route for testing
app.get('/', (req, res) => {
  res.json({
    message: 'Vighnaharta Infinity Backend is LIVE',
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    message: 'Route not found',
    requested: req.originalUrl 
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error:', err.stack);
  res.status(500).json({
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

module.exports = app;