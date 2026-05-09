require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const formatResponse = require('./middleware/responseFormatter');

// Route Imports
const produkRoutes = require('./routes/produkRoutes');
const pelangganRoutes = require('./routes/pelangganRoutes');
const pembayaranRoutes = require('./routes/pembayaranRoutes');
const laporanRoutes = require('./routes/laporanRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom Middleware
app.use(formatResponse);

// Routes
app.use('/api/produk', produkRoutes);
app.use('/api/pelanggan', pelangganRoutes);
app.use('/api/pembayaran', pembayaranRoutes);
app.use('/api/laporan', laporanRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found',
    data: null
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    data: null
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
