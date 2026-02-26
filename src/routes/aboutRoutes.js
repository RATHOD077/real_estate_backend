const express = require('express');
const router = express.Router();
const aboutController = require('../controller/aboutController');

router.get('/', aboutController.getAbout);
router.put('/', aboutController.updateAbout);

module.exports = router;