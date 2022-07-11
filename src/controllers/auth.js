const userModel = require('../models/users');
const response = require('../helpers/standardResponse');
const errorResponse = require('../helpers/errorResponse');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = (req, res) => {
  req.body.pin = null;
  userModel.createUser(req.body, (err) => {
    if (err) {
      return errorResponse(err, res);
    }
    return response(res, 'Register successfully');
  });
};

exports.createPin = (req, res) => {
  const { email } = req.body;
  userModel.getUserByEmail(email, (err, results) => {
    if (results.rows.length > 0) {
      const user = results.rows[0];
      if (user.pin === null) {
        userModel.updateUser(user.id, { pin: req.body.pin }, (err, resultUpdate) => {
          console.log(err);
          const userUpdated = resultUpdate.rows[0];
          if (userUpdated.email === user.email) {
            return response(res, 'Create pin succes');
          }
        });
      } else {
        return response(res, 'Pin already set', null, null, 400);
      }
    }
    else {
      return response(res, 'Email doesn\'t exist', null, null, 400);
    }
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  userModel.getUserByEmail(email, (err, results) => {
    if (results.rows.length < 1) {
      return response(res, 'User not found', null, null, 400);
    }
    const user = results.rows[0];
    bcrypt.compare(password, user.password)
      .then((cpRes) => {
        if (cpRes) {
          const token = jwt.sign({ id: user.id }, process.env.APP_SECRET || 'secretKey');
          return response(res, 'Login success', { token }, results.rows);
        }
        return response(res, 'Email or Password not match', null, null, 400);
      })
      .catch(res => {
        return response(res, 'Email or Password not match', null, null, 404);
      });
  });
};