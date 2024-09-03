const express = require('express');
const router = express.Router();
const checkerGudangController = require('../controllers/checkerGudangController');

router.post('/add', checkerGudangController.addCheckerGudang);

router.get('/all', checkerGudangController.getAllCheckerGudang);

module.exports = router;
