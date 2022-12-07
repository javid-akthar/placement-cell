const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller')
const passport = require('../config/passport-local-strategy');
console.log('router loaded');

// router for home page
router.get('/',passport.checkAuthentication, homeController.home);

// router for user page
router.use('/users',require('./users'));

// router for student page
router.use('/student',passport.checkAuthentication,require('./student'));

// router for company page
router.use('/company',passport.checkAuthentication,require('./company'));

// router for csv download
router.use("/csv", passport.checkAuthentication, require("./csv"));

// router to view job interivews
router.use("/job", passport.checkAuthentication, require("./job"));

module.exports = router;