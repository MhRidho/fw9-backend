const jwt = require('jsonwebtoken');
const response = require('../helpers/standardResponse');

const auth = (req, res, next) => {
  if (req.headers.authorization) {

    const auth = req.headers.authorization;
    const prefix = 'Bearer';
    if (auth.startsWith(prefix)) {
      const token = auth.slice(prefix.length + 1, auth.length);
      try {
        const results = jwt.verify(token, process.env.APP_SECRET || 'secretKey');
        req.authUser = results;
        console.log(req.authUser);
        next();
      } catch (e) {
        return response(res, 'Token expired', null, null, 401);
      }
    }
    else {
      return response(res, 'Unautorization', null, null, 401);
    }
  }
};

module.exports = auth;