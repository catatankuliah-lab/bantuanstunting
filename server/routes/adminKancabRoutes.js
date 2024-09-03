const express = require('express');
const router = express.Router();
const adminKancabController = require('../controllers/adminKancabController');

router.post('/add', adminKancabController.addAdminKancab);

router.get('/all', adminKancabController.getAllAdminKancab);

module.exports = router;
