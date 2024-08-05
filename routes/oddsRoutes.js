const express = require('express');
const router = express.Router();
const oddsController = require('../controllers/oddsController');

// router.get('/retrieve/:id', oddsController.getOddsById)
router.post('/save', oddsController.saveOdds)


module.exports = router;