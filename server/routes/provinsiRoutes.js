const express = require("express");
const router = express.Router();
const provinsiController = require("../controllers/provinsiController");

router.get("/all", provinsiController.getAllProvinsi);
router.get("/detail/:id", provinsiController.getDetailProvinsi);
router.get("/details/:id", provinsiController.getDetailsProvinsi);

module.exports = router;
