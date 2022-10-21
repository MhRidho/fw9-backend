const response = require('../helpers/standardResponse');
const errorResponse = require('../helpers/errorResponse');
// const errorResponse = require('../helpers/errorResponse');
const authModel = require('../models/authenticated');
const userModel = require('../models/users');
const profileModel = require('../models/profiles');
const { LIMIT_DATA } = process.env;
const { validationResult } = require('express-validator');

exports.getUserByAuth = (req, res) => {
  console.log(req.authUser.id);
  userModel.getUserById(req.authUser.id, (err, results) => {
    const user = results.rows[0];
    return res.json({
      message: 'Hello ' + user.email
    });
  });
};

exports.getUserLogin = (req, res) => {
  userModel.getUserById(req.authUser.id, (err, results) => {
    const user = results.rows[0];
    return response(res, 'Detail User Login', user);
  });
};

exports.getProfileLogin = (req, res) => {
  profileModel.getProfileByUserIdAuth(req.authUser.id, (err, results) => {
    const profile = results.rows[0];
    return response(res, 'Detail Profile Login', profile);
  });
};

exports.getAllTransactions = (req, res) => {
  const id = req.authUser.id;
  const { searchBy = 'notes', keyword = '', order_by = 'notes', limit = parseInt(LIMIT_DATA), page = 1, sortType = 'ASC' } = req.query;
  const offset = (page - 1) * limit;

  authModel.getAllTransactions(id, searchBy, keyword, order_by, sortType, limit, offset, (err, results) => {
    if (results.length < 1) {
      return res.redirect('/404');
    }
    const pageInfo = {};
    authModel.countAllTransactions(id, searchBy, keyword, (err, totalData) => {
      pageInfo.totalData = totalData;
      pageInfo.totalPage = Math.ceil(totalData / limit);
      pageInfo.currentPage = parseInt(page);
      pageInfo.nextPage = pageInfo.currentPage < pageInfo.totalPage ? pageInfo.currentPage + 1 : null;
      pageInfo.prevPage = pageInfo.currentPage > 1 ? pageInfo.currentPage - 1 : null;
      pageInfo.limit = limit;
      return response(res, 'List All Transaction', results, pageInfo);
    });
  });
};

exports.createTransfer = (req, res) => {
  const sender_id = req.authUser.id;
  const { amount, pin } = req.body;

  userModel.getUserById(sender_id, (err, results) => {
    if (results.rows.length > 0) {
      const user = results.rows[0];
      profileModel.getProfileByUserIdTransfer(sender_id, (err, results2) => {
        if (results2.rows.length > 0) {
          const profile = results2.rows[0];
          if (parseInt(profile.balance) >= parseInt(amount)) {
            if (pin == user.pin) {
              authModel.createTransfer(sender_id, amount, req.body, (err, results3) => {
                if (err) {
                  return errorResponse(err, res);
                } else {
                  console.log(profile.balance);
                  return response(res, `Transaction is successfully, balance left: Rp. ${profile.balance - results3.rows[0].amount}`, results3.rows[0]);
                }
              });
            } else {
              return response(res, 'Input pin failed', null, null, 400);
            }
          } else {
            return response(res, 'Balance not enough', null, null, 400);
          }
        }
      });
    } else {
      return response(res, 'User not found', null, null, 400);
    }
  });
};

exports.createTopup = (req, res) => {
  const recipient_id = req.authUser.id;
  const { amount, type_id = 1, notes = 'Topup' } = req.body;
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  const time = mm + '-' + dd + '-' + yyyy;
  profileModel.getProfileByUserIdTransfer(recipient_id, (err, results1) => {
    if (results1.rows.length > 0) {
      const profile = results1.rows[0];
      authModel.createTopup(amount, recipient_id, type_id, notes, time, (err, results) => {
        if (err) {
          return errorResponse(err, res);
        } else {
          return response(res, `Top Up is Successfully, balance left: Rp.${Number(profile.balance) + Number(results.rows[0].amount)}`, results.rows[0]);
        }
      });
    } else {
      return response(res, 'Profile Not Found', null, null, 400);
    }
  });
};

exports.createPhone = (req, res) => {
  const id = req.authUser.id;
  authModel.createPhone(id, req.body, (err, results) => {
    return response(res, 'Create Phone Number successfully', results[0]);
  });
};

exports.editProfile = (req, res) => {
  const id = req.authUser.id;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return response(res, 'Validation Error', errors.array(), null, 400);
  }

  let filename = null;

  if (req.file) {
    filename = req.file.path;
  }
  authModel.editProfile(id, filename, req.body, (err, results) => {
    if (err) {
      return response(res, `Failed to update: ${err.message}`, null, null, 400);
    }
    return response(res, 'Profile edit success', results.rows[0]);
  });
};

exports.changePassword = (req, res) => {
  const id = req.authUser.id;
  authModel.changePassword(id, req.body, (err, results) => {
    console.log(err);
    return response(res, 'Edit Password succsess!', results.rows[0]);
  });
};

exports.changePin = (req, res) => {
  const id = req.authUser.id;
  authModel.changePin(id, req.body, (err, results) => {
    console.log(results);
    return response(res, 'Edit Pin Success!', results.rows[0]);
  });
};

exports.changePhone = (req, res) => {
  const id = req.authUser.id;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return response(res, 'Validation Error', errors.array(), null, 400);
  }

  let filename = null;

  if (req.file) {
    filename = req.file.filename;
  }
  authModel.changePhone(id, filename, req.body, (err, results) => {
    if (err) {
      return response(res, `Failed to update: ${err.message}`, null, null, 400);
    }
    return response(res, 'Edit Phone Number success', results.rows[0]);
  });
};