const { body } = require('express-validator');

const profileValidationRules = [
  body('fullname').isString().withMessage('Fullname must be a string'),
  body('balance').toInt().isNumeric().withMessage('Balance must be a string'),
  body('phonenumber').isMobilePhone('id-ID').withMessage('Phone number format is incorrect')
];

module.exports = profileValidationRules;