const express = require('express');
const router = express.Router();

router.post('/add', (req, res) => { res.status(200).send({ message: 'Not implemented'}); });
router.post('/add-player', (req, res) => { res.status(200).send({ message: 'Not implemented'}); });
router.post('/update', (req, res) => { res.status(200).send({ message: 'Not implemented'}); });
router.post('/delete', (req, res) => { res.status(200).send({ message: 'Not implemented'}); });
router.post('/delete-player', (req, res) => { res.status(200).send({ message: 'Not implemented'}); });
router.get('/:clubId/:season', (req, res) => { res.status(200).send({ message: 'Not implemented'}); });

module.exports = router;