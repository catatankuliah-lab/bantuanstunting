const express = require('express');
const router = express.Router();
const hakAksesController = require('../controllers/hakAksesController');

router.post('/add', hakAksesController.addHakAkses);
router.get('/all', hakAksesController.getAllHakAkses);
router.get('/detail/:id', hakAksesController.getDetailHakAkses);
router.get('/details/:id', hakAksesController.getDetailsHakAkses);


module.exports = router;
