const response = require('../helpers/standardResponse');
const userModel = require('../models/users');
// const bcrypt = require('bcrypt');


exports.getAllUsers = (req, res) => {
  userModel.getAllUsers((results) => {
    return response(res, 'Message from standard response', results);
  });
};


const { validationResult } = require('express-validator');
const errorResponse = require('../helpers/errorResponse');
exports.createUser =
  // [
  //   body('email')
  //     .isEmail().withMessage('Email format invalid'),
  //   body('username')
  //     .isLength({ min: 4 }).withMessage('Username Length minimal 4 character'),
  (req, res) => {
    // if (req.body.username.length < 4) {
    //   return response(res, 'Username length must be greater than 4 character', null, 400);
    // }
    const validation = validationResult(req);
    if (!validation.isEmpty()) {
      return response(res, 'Error occured', validation.array(), 400);
    }
    userModel.createUser(req.body, (err, results) => {
      if (err) {
        return errorResponse(err, res);
      } else {
        return response(res, 'Create user successfully', results[0]);
      }
    });
  };
//];

exports.editUser = (req, res) => {
  const { id } = req.params;
  userModel.updateUser(id, req.body, (results) => {
    return response(res, 'Update data sukses!', results[0]);
  });
};

exports.deleteUser = (req, res) => {
  const { id } = req.params;
  userModel.deleteUser(id, (results) => {
    return response(res, 'User deleted!', results[0]);
  });
};