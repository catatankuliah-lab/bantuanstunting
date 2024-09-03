const express = require('express');
const router = express.Router();
const doController = require('../controllers/doController');

router.post('/add', doController.addDo);

router.get('/all', doController.getAllDo);

module.exports = router;
