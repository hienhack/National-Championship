const express = require('express');
const router = express.Router();
const seasonController = require('../Controller/season.controller');
const uploader = require('../../Util/imageParser');

router.get('/', seasonController.getAllSeason);
router.get('/:year', seasonController.getSeason);
router.post('/create', uploader.single("image"), seasonController.create);
router.post('/update', seasonController.update);
router.post('/delete', seasonController.delete);
router.post('/add-club', seasonController.addClub);
router.post('/remove-club', seasonController.removeClub);

module.exports = router;