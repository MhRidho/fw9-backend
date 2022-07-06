const response = require('../helpers/standardResponse');
const transactionModel = require('../models/transactions');

exports.getAllTransactions = (req, res) => {
  transactionModel.getAllTransactions((results) => {
    return response(res, 'Message from standard response', results);
  });
};

exports.getTransactionById = (req, res) => {
  const { id } = req.params;
  transactionModel.getTransactionById(id, (err, results) => {
    if (results.rows.length > 0) {
      return response(res, 'Detail transactions', results.rows[0]);
    } else {
      return res.redirect('/404');
    }
  });
};

exports.createTransactions = (req, res) => {
  transactionModel.createTransactions(req.body, (results) => {
    return response(res, 'Create transaction successfully', results[0]);
  });
};

exports.editTransactions = (req, res) => {
  const { id } = req.params;
  transactionModel.updateTransactions(id, req.body, (results) => {
    return response(res, 'Updata data transaksi sukses', results[0]);
  });
};

exports.deleteTransactions = (req, res) => {
  const { id } = req.params;
  transactionModel.deleteTransactions(id, (results) => {
    return response(res, 'Transaction deleted!', results[0]);
  });
};