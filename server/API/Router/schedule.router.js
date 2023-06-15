const express = require('express');
const router = express.Router();

router.post('/add-match', (req, res) => { res.status(200).send({message: 'Not implemented'}); });
router.post('/update-round', (req, res) => { res.status(200).send({message: 'Not implemented'}); });
router.post('/generate-match', (req, res) => { res.status(200).send({message: 'Not implemented'}); });
router.get('/:seasonId', (req, res) => { res.status(200).send({message: 'Not implemented'}); });

module.exports = router;