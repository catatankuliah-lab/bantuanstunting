const express = require("express");
const router = express.Router();
const kabupatenController = require("../controllers/kabupatenController");

router.get("/all", kabupatenController.getAllKabupaten);
router.get("/detail/:id", kabupatenController.getDetailKabupaten);
router.get("/details/:id", kabupatenController.getDetailsKabupaten);

module.exports = router;
