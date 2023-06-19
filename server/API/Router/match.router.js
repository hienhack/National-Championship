const express = require('express');
const router = express.Router();

router.post('/create', (req, res) => { res.status(200).send({message: 'Not implemented'}); });
router.post('/add-goal', (req, res) => { res.status(200).send({ message: 'Not implemented'}); });
router.post('/update', (req, res) => { res.status(200).send({message: 'Not implemented'}); });
router.post('/delete', (req, res) => { res.status(200).send({message: 'Not implemented'}); });
router.get('/:matchId', (req, res) => { res.status(200).send({message: 'Not implemented'}); });

module.exports = router;