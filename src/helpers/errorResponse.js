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
    return response(res, 'Error', eres, null, 400);
  }
  if (err.code === '23505' && err.detail.includes('username')) {
    const eres = errorHandling('Email already exist', 'username');
    return response(res, 'Error', eres, null, 400);
  }
  if (err.column === 'amount' && err.message.includes('not-null')) {
    const eres = errorHandling('Amount cannot be null', 'amount');
    return response(res, 'Error', eres, null, 400);
  }
  return response(res, 'Error Data', null, null, 400);
};

module.exports = errorResponse;