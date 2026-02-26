const express = require('express');
const cors = require('cors');
require('dotenv').config();

const heroRoutes = require('./src/routes/heroRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const aboutRoutes = require('./src/routes/aboutRoutes');
const amenitiesRoutes = require('./src/routes/amenitiesRoutes');
const constructionUpdatesRoutes = require('./src/routes/constructionUpdatesRoutes');
const faqsRoutes = require('./src/routes/faqsRoutes');
const floorPlansRoutes = require('./src/routes/floorPlansRoutes');

const app = express();

// FIXED CORS – no trailing slash, exact match to Netlify origin
app.use(cors({
  origin: 'https://reall-estete.netlify.app',  // ← NO trailing slash!
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes (unchanged)
app.use('/api/hero', heroRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/about-project', aboutRoutes);
app.use('/api/amenities', amenitiesRoutes);
app.use('/api/construction-updates', constructionUpdatesRoutes);
app.use('/api/faqs', faqsRoutes);
app.use('/api/floor-plans', floorPlansRoutes);

// Root health check
app.get('/', (req, res) => {
  res.json({
    message: 'Vighnaharta Infinity Backend is LIVE',
    status: 'ok',
    allowedOrigin: 'https://reall-estete.netlify.app',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found', requested: req.originalUrl });
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
