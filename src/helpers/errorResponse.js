const response = require('./standardResponse');
const errorHandling = (msg, param, location = 'body') => [
  {
    msg,
    param,
    location
  }
];

const errorResponse = (err, res) => {
  if (err.code === '23505' && err.detail.includes('email')) {
    const eres = errorHandling('Email already exist', 'email');
    return response(res, 'Error', eres, 400);
  }
  if (err.code === '23505' && err.detail.includes('username')) {
    const eres = errorHandling('Email already exist', 'username');
    return response(res, 'Error', eres, 400);
  }
  return response(res, 'Error', null, 400);
};

module.exports = errorResponse;