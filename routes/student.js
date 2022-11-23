const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller')
const studentController = require('../controllers/student_controller');
const passport = require('../config/passport-local-strategy');

router.get('/',passport.checkAuthentication, homeController.home);
router.post('/create', studentController.createStudent);
router.get('/delete/', studentController.deleteStudent);
router.post('/update', studentController.updateStudent);


module.exports = router;