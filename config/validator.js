const { check, validationResult } = require('express-validator')

exports.createUser = [
    check('email', 'email is not valid')
        .isEmail()
        .normalizeEmail({ gmail_remove_dots: false })
        .notEmpty(),
    check('name', 'name should not be empty and greater than 3 characters').not().isEmpty().trim().escape()
    // check('password', 'password is not valid').isString()
    //     .isLength({ min: 8 })
        // .not()
        // .isLowercase()
        // .not()
        // .isUppercase()
        // .not()
        // .isNumeric()
        // .not()
        // .isAlpha()

];

// exports.anotherRoute = [/// check data];

// exports.doSomethingElse = [// check data];