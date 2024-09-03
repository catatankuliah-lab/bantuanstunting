const express = require("express");
const router = express.Router();
const masterdatakpmController = require("../controllers/masterdatakpmController");

router.post("/add", masterdatakpmController.addMasterDataKpm);
router.get("/all", masterdatakpmController.getAllDataMasterKpm);
router.get("/detail/:id", masterdatakpmController.getDataMasterKpmbyID);
router.get("/iddesa/:id", masterdatakpmController.getDataMasterKpmbyIDDesa);
router.put("/updatestatus/:id", masterdatakpmController.updateStatusKPMDiganti);

module.exports = router;
