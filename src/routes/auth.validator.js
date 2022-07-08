const bcrypt = require('bcrypt');
const { body } = require('express-validator');

exports.register = [
  body('email')
    .isEmail().withMessage('Email format invalid'),
  body('username')
    .isLength({ min: 4 }).withMessage('Username length minimal 4 character'),
  body('password')
    .isLength({ min: 8 }).withMessage('Password length minimal 8 character')
    .customSanitizer(async (val) => {
      const hash = await bcrypt.hash(val, 10);
      return hash;
    }),
  body('username').trim()
];

exports.createPin = [
  body('email')
    .isEmail().withMessage('Email format invalid'),
  body('pin')
    .isLength({ min: 6, max: 6 }).withMessage('Pin length must be 6')
    .isNumeric().withMessage('Pin must be a number'),
];

exports.login = [
  body('email')
    .isEmail().withMessage('Email format invalid'),
];