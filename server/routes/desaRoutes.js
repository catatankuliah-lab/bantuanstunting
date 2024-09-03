const express = require("express");
const router = express.Router();
const desaController = require("../controllers/desaController");

router.get("/all", desaController.getAllDesa);
router.get("/detail/:id", desaController.getDetailDesa);
router.get("/details/:id", desaController.getDetailsDesa);

module.exports = router;
