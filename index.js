require('dotenv').config();
const express = require('express');
const authMiddleware = require('./src/middleware/auth');
const response = require('./src/helpers/standardResponse');

global.__basepath = __dirname;

const app = express();

app.use(express.urlencoded({ extended: false }));

// Untuk cek backend apakah sudah running
app.get('/', (req, res) => {
  return res.json({
    success: true,
    message: 'Backend is running well'
  });
});

// Untuk Authenticated user
app.get('/authenticatedUser', authMiddleware, (req, res) => {
  const userModel = require('./src/models/users');
  userModel.getUserById(req.authUser.id, (err, results) => {
    const user = results.rows[0];
    return res.json({
      message: 'Hello ' + user.email
    });
  });
});

// Melihat detail user yang sedang login
app.get('/profiles', authMiddleware, (req, res) => {
  const userModel = require('./src/models/users');
  userModel.getUserById(req.authUser.id, (err, results) => {
    const user = results.rows[0];
    return response(res, 'Detail Profile Login', user);
  });
});

// Melihat history transaksi user yang sedang login
app.get('/historyTransactions', authMiddleware, (req, res) => {
  const transModel = require('./src/models/transactions');
  transModel.getTransactionById(req.authUser.id, (err, results) => {
    console.log(req.authUser.id);
    const trans = results.rows[0];
    return response(res, 'Detail History Transactions User', trans);
  });
});

// Untuk mengarahkan ke halaman Routes
app.use('/', require('./src/routes'));

// untuk menampilkan apabila ada url yang error
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