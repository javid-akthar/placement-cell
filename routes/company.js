const express = require('express');
const router = express.Router();
const companyController = require('../controllers/company_controller');
const passport = require('../config/passport-local-strategy');

router.get('/', companyController.showComapny)
router.post('/create', companyController.createCompany);
router.get('/delete', companyController.deleteCompany);
router.post('/update', companyController.updateCompany);
router.post('/shedule-interview', companyController.sheduleInterview);
router.post('/edit-sheduled-interview', companyController.updateSheduledInterview);
router.get('/delete-sheduled-interview', companyController.deleteSheduledInterview);

module.exports = router;