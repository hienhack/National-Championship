const express = require('express');
const router = express.Router();
const reportController = require('../Controller/report.controller');

router.get('/:seasonId/standings', reportController.getStandings);
router.get('/:seasonId/goals', reportController.getGoals);

module.exports = router;