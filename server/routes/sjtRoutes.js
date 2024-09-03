const express = require('express');
const router = express.Router();
const sjtController = require('../controllers/sjtController');

router.post('/add', sjtController.addSjt);

router.get('/all', sjtController.getAllSjt);

module.exports = router;
