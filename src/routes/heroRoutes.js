const express = require('express');
const router = express.Router();
const heroController = require('../controller/heroController');

// Public read
router.get('/', heroController.getHero);

// Admin write (you can add auth middleware later)
router.put('/', heroController.updateHero);

module.exports = router;