const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateJWT = require('../middleware/authenticateJWT');

router.post('/login', userController.getLogin);
router.post('/add', userController.addUser);
router.get('/all', authenticateJWT, (req, res) => {
    userController.getAllUser(req, res);
});


module.exports = router;
