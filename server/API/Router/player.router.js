const express = require('express');
const router = express.Router();
const playerController = require('../Controller/player.controller');
const uploader = require('../../Util/imageParser');

router.get('/', playerController.getAllPlayer);
router.get('/:playerId', playerController.playerDetail);
router.post('/create', uploader.single("image"), playerController.create);
router.post('/update', uploader.single("image"), playerController.update);
router.post('/delete', playerController.delete);
router.post('/register', playerController.register);

module.exports = router;