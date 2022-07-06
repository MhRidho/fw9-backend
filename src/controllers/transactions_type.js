const response = require('../helpers/standardResponse');
const transModel = require('../models/transactions_type');

exports.getAllTrans_type = (req, res) => {
  transModel.getAllTrans_type((results) => {
    return response(res, 'Message from standar response', results);
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