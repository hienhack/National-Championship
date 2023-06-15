const express = require('express');
const router = express.Router();

router.post('/add', (req, res) => { res.status(200).send({message: 'Not implemented'}); });
router.post('/update', (req, res) => { res.status(200).send({message: 'Not implemented'}); });
router.post('/delete', (req, res) => { res.status(200).send({message: 'Not implemented'}); });
router.get('/:playerId', (req, res) => { res.status(200).send({message: 'Not implemented'}); });

module.exports = router;