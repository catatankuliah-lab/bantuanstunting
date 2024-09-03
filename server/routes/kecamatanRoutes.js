const express = require("express");
const router = express.Router();
const kecamatanController = require("../controllers/kecamatanController");

router.get("/all", kecamatanController.getAllKecamatan);
router.get("/detail/:id", kecamatanController.getDetailKecamatan);
router.get("/details/:id", kecamatanController.getDetailsKecamatan);

module.exports = router;
