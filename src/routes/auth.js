const auth = require('express').Router();

const authController = require('../controllers/auth');
const rules = require('./auth.validator');
const validation = require('../middleware/validation');

auth.post('/register', rules.register, validation, authController.register);
auth.post('/createPin', rules.createPin, validation, authController.createPin);
auth.post('/login', rules.login, validation, authController.login);

module.exports = auth;
