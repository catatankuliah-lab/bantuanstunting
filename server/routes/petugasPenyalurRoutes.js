const express = require('express');
const router = express.Router();
const petugasPenyalurController = require('../controllers/petugasPenyalurController');

router.post('/add', petugasPenyalurController.addPetugasPenyalur);

router.get('/all', petugasPenyalurController.getAllPetugasPenyalur);

module.exports = router;
