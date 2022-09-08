const response = require('../helpers/standardResponse');
const transactionModel = require('../models/transactions');
const { LIMIT_DATA } = process.env;

exports.getAllTransactions = (req, res) => {
  const { search = '', limit = parseInt(LIMIT_DATA), page = 1, sortType = 'ASC' } = req.query;
  const offset = (page - 1) * limit;

  transactionModel.getAllTransactions(search, sortType, limit, offset, (err, results) => {
    if (results.length < 1) {
      return res.redirect('/404');
    }
    const pageInfo = {};
    transactionModel.countAllTransactions(search, (err, totalData) => {
      pageInfo.totalData = totalData;
      pageInfo.totalPage = Math.ceil(totalData / limit);
      pageInfo.currentPage = parseInt(page);
      pageInfo.nextPage = pageInfo.currentPage < pageInfo.totalPage ? pageInfo.currentPage + 1 : null;
      pageInfo.prevPage = pageInfo.currentPage > 1 ? pageInfo.currentPage - 1 : null;
      return response(res, 'List All Transaction', results, pageInfo);
    });
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
  transactionModel.createTransactions(req.body, (err, results) => {
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