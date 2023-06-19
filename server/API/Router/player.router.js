const express = require('express');
const router = express.Router();
const playerController = require('../Controller/player.controller');
const uploader = require('../../Util/imageParser')

router.get('/:playerId', playerController.playerDetail);
router.get('/', playerController.getAllPlayer);
router.post('/create', uploader.single("image"), playerController.create);
router.post('/update', uploader.single("image"), playerController.update);
router.post('/delete', playerController.delete);

module.exports = router;