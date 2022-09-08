const auth = require('express').Router();
const bcrypt = require('bcrypt');
const { body } = require('express-validator');

const authController = require('../controllers/auth');
const authenController = require('../controllers/authenticated');
const rules = require('./auth.validator');
const validation = require('../middleware/validation');
const authMiddleware = require('../middleware/auth');
const uploadMiddleware = require('../middleware/uploadProfile');

const createUserValidator = [
  body('password')
    .isLength({ min: 8 }).withMessage('Password length minimal 8 character')
    .customSanitizer(async (val) => {
      const hash = await bcrypt.hash(val, 10);
      return hash;
    }),
  body('username').trim()
];

// Process Authenticated
auth.post('/register', rules.register, validation, authController.register);
auth.post('/createPin', rules.createPin, validation, authController.createPin);
auth.post('/login', rules.login, validation, authController.login);

// Process environment
auth.get('/authenticatedUser', authMiddleware, authenController.getUserByAuth);
auth.get('/users', authMiddleware, authenController.getUserLogin);
auth.get('/profiles', authMiddleware, authenController.getProfileLogin);
auth.get('/historyTransactions', authMiddleware, authenController.getAllTransactions);

auth.post('/transfer', authMiddleware, authenController.createTransfer);
auth.post('/topup', authMiddleware, authenController.createTopup);
auth.post('/phone', authMiddleware, authenController.createPhone);
auth.patch('/profile', authMiddleware, uploadMiddleware, authenController.editProfile);
auth.patch('/changePassword', authMiddleware, ...createUserValidator, authenController.changePassword);
auth.patch('/changePin', authMiddleware, authenController.changePin);
auth.patch('/phone', authMiddleware, authenController.changePhone);

module.exports = auth;
