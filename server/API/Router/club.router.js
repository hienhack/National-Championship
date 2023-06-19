const express = require('express');
const router = express.Router();
const clubController = require('../Controller/club.controller');
const uploader = require('../../Util/imageParser');

router.post('/create', uploader.single("image"), clubController.createClub);
router.post('/add-player', clubController.addPlayer);
router.post('/update', uploader.single("image"), clubController.updateClub);
router.post('/delete', clubController.deleteClub);
router.post('/delete-player', clubController.deletePlayerFromClub);
router.get('/:clubId/:seasonId', clubController.getClub);

module.exports = router;