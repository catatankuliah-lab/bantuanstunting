const express = require('express');
const router = express.Router();
const alokasiController = require('../controllers/alokasiController');

// Route untuk menambahkan mobil baru
router.post('/add', alokasiController.addAlokasi);

// Route untuk membaca semua data mobil
router.get('/all', alokasiController.getAllAlokasi);

module.exports = router;
