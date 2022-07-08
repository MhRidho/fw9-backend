const router = require('express').Router();

router.use('/users', require('./users'));
router.use('/transactions', require('./transactions'));
router.use('/profiles', require('./profiles'));
router.use('/transactions_type', require('./transactions_type'));
router.use('/auth', require('./auth'));

module.exports = router;