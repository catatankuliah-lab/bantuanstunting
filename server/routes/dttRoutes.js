const express = require("express");
const router = express.Router();
const dttRoutes = require("../controllers/dttController");

router.get("/iddesa/:id", dttRoutes.getDTTbyIdDesa);

module.exports = router;
