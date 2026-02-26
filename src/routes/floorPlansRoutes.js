const express = require('express');
const router = express.Router();
const floorPlansController = require('../controller/floorPlansController');

router.get('/', floorPlansController.getFloorPlans);
router.post('/', floorPlansController.createFloorPlan);
router.put('/:id', floorPlansController.updateFloorPlan);
router.delete('/:id', floorPlansController.deleteFloorPlan);

module.exports = router;