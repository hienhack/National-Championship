const express = require('express');
const router = express.Router();

router.get('/:seasonId/standings', (req, res) => { res.status(200).send({message: 'Not implemented'}); });
router.get('/:seasonId/goals', (req, res) => { res.status(200).send({message: 'Not implemented'}); });

module.exports = router;