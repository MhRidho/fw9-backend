const transactions = require('express').Router();

const transactionController = require('../controllers/transactions');

transactions.get('/', transactionController.getAllTransactions);
transactions.get('/:id', transactionController.getTransactionById);
transactions.post('/', transactionController.createTransactions);
transactions.patch('/:id', transactionController.editTransactions);
transactions.delete('/:id', transactionController.deleteTransactions);

module.exports = transactions;