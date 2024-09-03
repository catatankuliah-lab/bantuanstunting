const express = require('express');
const router = express.Router();
const itemWoController = require('../controllers/itemWoController');

router.post('/add', itemWoController.addItemWo);

router.get('/all', itemWoController.getAllItemWo);

module.exports = router;
