const response = require('../helpers/standardResponse');
const userModel = require('../models/users');
const { validationResult } = require('express-validator');
const errorResponse = require('../helpers/errorResponse');

const { LIMIT_DATA } = process.env;

exports.getAllUsers = (req, res) => {
  const { search = '', limit = parseInt(LIMIT_DATA), page = 1, sortType = 'ASC' } = req.query;
  const sortBy = 'email';
  const offset = (page - 1) * limit;

  userModel.getAllUsers(search, sortBy, sortType, limit, offset, (err, results) => {
    if (results.length < 1) {
      return res.redirect('/404');
    }
    const pageInfo = {};

    userModel.countAllUsers(search, (err, totalData) => {
      pageInfo.totalData = totalData;
      pageInfo.totalPage = Math.ceil(totalData / limit);
      pageInfo.currentPage = parseInt(page);
      pageInfo.nextPage = pageInfo.currentPage < pageInfo.totalPage ? pageInfo.currentPage + 1 : null;
      pageInfo.prevPage = pageInfo.currentPage > 1 ? pageInfo.currentPage - 1 : null;
      return response(res, 'List All Users', results, pageInfo);
    });
  });
};

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

exports.getUserById = (req, res) => {
  const { id } = req.params;
  userModel.getUserById(id, (err, results) => {
    if (results.rows.length > 0) {
      return response(res, 'Detail User', results.rows[0]);
    } else {
      return res.redirect('/404');
    }
  });
};

exports.editUser = (req, res) => {
  const { id } = req.params;
  userModel.updateUser(id, req.body, (err, results) => {
    console.log(results);
    return response(res, 'Update data succsess!', results.rows[0]);
  });
};

exports.deleteUser = (req, res) => {
  const { id } = req.params;
  userModel.deleteUser(id, (results) => {
    return response(res, 'User deleted!', results[0]);
  });
};