const response = require('../helpers/standardResponse');
const transactionModel = require('../models/transactions');

exports.getAllTransactions = (req, res) => {
  transactionModel.getAllTransactions((results) => {
    return response(res, 'Message from standard response', results);
  });
};

exports.createTransactions = (req, res) => {
  transactionModel.createTransactions(req.body, (results) => {
    return response(res, 'Create transaction successfully', results[0]);
  });
};