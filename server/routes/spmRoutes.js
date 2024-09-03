const express = require('express');
const router = express.Router();
const spmController = require('../controllers/spmController');

router.post('/add', spmController.addSPM);
router.get('/all', spmController.getAllSPM);
router.get('/detail/:id', spmController.getDetailSPMByIDSPM);

module.exports = router;
