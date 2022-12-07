const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller')
const studentController = require('../controllers/student_controller');
const passport = require('../config/passport-local-strategy');

// router for student home page
router.get('/',passport.checkAuthentication, homeController.home);

// router for create student
router.post('/create', studentController.createStudent);

// router for delete student
router.get('/delete/', studentController.deleteStudent);

// router for update student
router.post('/update', studentController.updateStudent);


module.exports = router;