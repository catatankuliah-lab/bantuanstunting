const express = require("express");
const router = express.Router();
const kpmPengganti = require("../controllers/kpmPenggantiController");

router.post("/add", kpmPengganti.addKPMPengganti);
router.get("/all", kpmPengganti.getAllKPMPengganti);
router.get("/iddesa/:id", kpmPengganti.getKPMPengganti);

module.exports = router;
