const users = require('express').Router();

const userController = require('../controllers/users');
const bcrypt = require('bcrypt');

const { body } = require('express-validator');

const createUserValidator = [
  body('email')
    .isEmail().withMessage('Email format invalid'),
  body('username')
    .isLength({ min: 4 }).withMessage('Username length minimal 4 character'),
  body('password')
    .isLength({ min: 8 }).withMessage('Password length min 8 character')
    .customSanitizer(async (val) => {
      const hash = await bcrypt.hash(val, 10);
      return hash;
    })
];

users.get('/', body('limit').toInt(), body('page').toInt(), userController.getAllUsers);
users.get('/:id', userController.getUserById);
users.post('/', ...createUserValidator, userController.createUser);
users.patch('/:id', userController.editUser);
users.delete('/:id', userController.deleteUser);

module.exports = users;