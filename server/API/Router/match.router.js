const express = require('express');
const router = express.Router();
const matchController = require('../../API/Controller/match.controller');

router.get('/:matchId', matchController.matchDetail);
router.get('/', matchController.getAll);
router.post('/create', matchController.create);
router.post('/add-goal', matchController.addGoal);
router.post('/add-redcard', matchController.addCard);
router.post('/update', matchController.update);
router.post('/delete', matchController.delete);

module.exports = router;