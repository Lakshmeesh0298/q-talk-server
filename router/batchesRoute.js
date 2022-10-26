const express = require("express");
const {
  registerbatchController,
  batchList,
  indiualBatchList,
} = require("../controller/batchesController");
const storage = require("../config/multer");
const multer = require("multer");

let uploader = multer({ storage });
const router = express.Router();

router.post("/batch_create", uploader.any("file"), registerbatchController);
router.get("/batch_list", batchList);
router.get("/batch_list/:batchcode", indiualBatchList);

module.exports = router;

   