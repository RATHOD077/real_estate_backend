const express = require('express');
const router = express.Router();
const adminCtrl = require('../controller/adminController');

router.post('/login', adminCtrl.login);

module.exports = router;