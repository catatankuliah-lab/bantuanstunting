const express = require('express');
const router = express.Router();
const picGudangController = require('../controllers/picGudangController');

router.post('/add', picGudangController.addPicGudang);

router.get('/all', picGudangController.getAllPicGudang);

module.exports = router;
