const express = require("express");
const router = express.Router();

// importing the csvController
const csvController = require("../controllers/csv_controller");

// route for exporting csv file
router.get("/download", csvController.downloadCSV);

// exporting router
module.exports = router;
