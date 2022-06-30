const users = require('express').Router();

const userController = require('../controllers/users');

const { body } = require('express-validator');

const createUserValidator = [
  body('email')
    .isEmail().withMessage('Email format invalid'),
  body('username')
    .isLength({ min: 4 }).withMessage('Username length minimal 4 character')
];

users.get('/', userController.getAllUsers);
users.post('/', ...createUserValidator, userController.createUser);
users.patch('/:id', userController.editUser);
users.delete('/:id', userController.deleteUser);

module.exports = users;