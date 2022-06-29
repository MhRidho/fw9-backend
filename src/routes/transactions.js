const transactions = require('express').Router();

const transactionController = require('../controllers/transactions');

transactions.get('/', transactionController.getAllTransactions);
transactions.post('/', transactionController.createTransactions);

module.exports = transactions;