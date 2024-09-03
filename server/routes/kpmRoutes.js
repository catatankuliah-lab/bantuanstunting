const express = require("express");
const router = express.Router();
const kpmRoutes = require("../controllers/kpmController");

router.post("/add", kpmRoutes.addKPM);

router.get("/all", kpmRoutes.getAllKPM);

module.exports = router;
