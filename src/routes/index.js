const router = require('express').Router();

router.use('/admin/users', require('./users'));
router.use('/admin/transactions', require('./transactions'));
router.use('/admin/profiles', require('./profiles'));
router.use('/admin/transactions_type', require('./transactions_type'));
router.use('/auth', require('./auth'));

module.exports = router;