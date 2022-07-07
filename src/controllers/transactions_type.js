const response = require('../helpers/standardResponse');
const transModel = require('../models/transactions_type');
const { LIMIT_DATA } = process.env;

exports.getAllTrans_type = (req, res) => {
  const { search = '', limit = parseInt(LIMIT_DATA), page = 1, sortType = 'ASC' } = req.query;
  const offset = (page - 1) * limit;

  transModel.getAllTrans_type(search, sortType, limit, offset, (err, results) => {
    if (results.length < 1) {
      return res.redirect('/404');
    }
    const pageInfo = {};
    transModel.countAllTrans_type(search, (err, totalData) => {
      pageInfo.totalData = totalData;
      pageInfo.totalPage = Math.ceil(totalData / limit);
      pageInfo.currentPage = parseInt(page);
      pageInfo.nextPage = pageInfo.currentPage < pageInfo.totalPage ? pageInfo.currentPage + 1 : null;
      pageInfo.prevPage = pageInfo.currentPage > 1 ? pageInfo.currentPage - 1 : null;
      return response(res, 'List All Transaction Type', results, pageInfo);
    });
  });
};

exports.getTrans_typeById = (req, res) => {
  const { id } = req.params;
  transModel.getTrans_typeById(id, (err, results) => {
    if (results.rows.length > 0) {
      return response(res, 'Detail transaction_type', results.rows[0]);
    } else {
      return res.redirect('/404');
    }
  });
};

exports.createTrans_type = (req, res) => {
  transModel.createTrans_type(req.body, (results) => {
    return response(res, 'Create Transaction type successfully', results[0]);
  });
};

exports.editTrans_type = (req, res) => {
  const { id } = req.params;
  transModel.updateTrans_type(id, req.body, (results) => {
    return response(res, 'Update Transaction type successfully', results[0]);
  });
};

exports.deleteTrans_type = (req, res) => {
  const { id } = req.params;
  transModel.deleteTrans_type(id, (results) => {
    return response(res, 'Transaction type deleted!', results[0]);
  });
};