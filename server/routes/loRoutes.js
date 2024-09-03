const express = require('express');
const router = express.Router();
const loController = require('../controllers/loController');

router.post('/add', loController.addLo);

router.get('/all', loController.getAllLo);

module.exports = router;
