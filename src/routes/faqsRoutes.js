const express = require('express');
const router = express.Router();
const faqsController = require('../controller/faqsController');

router.get('/', faqsController.getFaqs);
router.post('/', faqsController.createFaq);
router.put('/:id', faqsController.updateFaq);
router.delete('/:id', faqsController.deleteFaq);

module.exports = router;