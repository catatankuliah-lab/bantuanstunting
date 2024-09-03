const express = require('express');
const router = express.Router();
const kantorCabangController = require('../controllers/kantorCabangController');

router.post('/add', kantorCabangController.addKantorCabang);

router.get('/all', kantorCabangController.getAllKantorCabang);

module.exports = router;
