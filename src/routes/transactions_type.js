const trans_type = require('express').Router();
const trans_typeController = require('../controllers/transactions_type');

trans_type.get('/', trans_typeController.getAllTrans_type);
trans_type.get('/:id', trans_typeController.getTrans_typeById);
trans_type.post('/', trans_typeController.createTrans_type);
trans_type.patch('/:id', trans_typeController.editTrans_type);
trans_type.delete('/:id', trans_typeController.deleteTrans_type);

module.exports = trans_type;