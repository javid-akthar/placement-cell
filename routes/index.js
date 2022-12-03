const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller')
const passport = require('../config/passport-local-strategy');
console.log('router loaded');

router.get('/',passport.checkAuthentication, homeController.home);
router.use('/users',require('./users'));
router.use('/student',passport.checkAuthentication,require('./student'));
router.use('/company',passport.checkAuthentication,require('./company'));
router.use("/csv", passport.checkAuthentication, require("./csv"));
router.use("/job", passport.checkAuthentication, require("./job"));
// router.use('/company',require('./company'));

module.exports = router;