require('dotenv').config();
const express = require('express');
const cors = require('cors');

global.__basepath = __dirname;

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));

// Untuk cek backend apakah sudah running
app.get('/', (req, res) => {
  return res.json({
    success: true,
    message: 'Backend is running well'
  });
});

// Untuk mengarahkan ke halaman Routes
app.use('/', require('./src/routes'));

// untuk menampilkan apabila ada url yang tidak ada/ error
app.use('*', (req, res) => {
  return res.status(404).json({
    success: false,
    message: 'Resource not found'
  });
});

// untuk menjalankan di web browser dengan PORT pada .env
app.listen(process.env.PORT, () => {
  console.log(`Port is running on port ${process.env.PORT}`);
});