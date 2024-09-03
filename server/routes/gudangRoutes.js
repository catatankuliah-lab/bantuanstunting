const express = require("express");
const router = express.Router();
const gudangController = require("../controllers/gudangController");

router.post("/add", gudangController.addGudang);

router.get("/all", gudangController.getAllGudang);

module.exports = router;
