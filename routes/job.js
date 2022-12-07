// importing express for router
const express = require("express");
const router = express.Router();


const jobController = require("../controllers/job_listing_controller");

// router for job listing
router.get("/", jobController.fetchJob);

// exporting router
module.exports = router;
