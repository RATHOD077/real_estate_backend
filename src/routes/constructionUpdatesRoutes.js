const express = require('express');
const router = express.Router();
const constructionUpdatesController = require('../controller/constructionUpdatesController');

router.get('/', constructionUpdatesController.getUpdates);
router.post('/', constructionUpdatesController.createUpdate);
router.put('/:id', constructionUpdatesController.updateUpdate);
router.delete('/:id', constructionUpdatesController.deleteUpdate);

module.exports = router;