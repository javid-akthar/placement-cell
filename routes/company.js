const express = require('express');
const router = express.Router();

// importing the companyController
const companyController = require('../controllers/company_controller');
const passport = require('../config/passport-local-strategy');

// company page route
router.get('/', companyController.showComapny)
// create company route
router.post('/create', companyController.createCompany);
// delete company route
router.get('/delete', companyController.deleteCompany);
// update company route
router.post('/update', companyController.updateCompany);
// shedule interview route
router.post('/shedule-interview', companyController.sheduleInterview);
// update sheduled interview route
router.post('/edit-sheduled-interview', companyController.updateSheduledInterview);
// delete sheduled interview route
router.get('/delete-sheduled-interview', companyController.deleteSheduledInterview);

// exporting the router
module.exports = router;