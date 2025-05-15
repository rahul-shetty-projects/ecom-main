const { check, validationResult } = require('express-validator');

exports.registerValidationResult = (req,res,next) =>{
    const result = validationResult(req)
    if(!result.isEmpty()){
        const error = result.array()[0].msg;
        return res.status(422).json({success: false, error: error})
    }
    next();
}

exports.registerValidator = [
    check('firstName')
    .trim()
    .not()
    .isEmpty()
    .withMessage('First Name is required!')
    .isLength({ min:3 , max:20 })
    .withMessage('First Name must be 3 to 20 characters long!'),
    check('lastName')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Last Name is required!')
    .isLength({ min:3 , max:20 })
    .withMessage('last Name must be 3 to 20 characters long!'),
    check('userEmail')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Email is required!')
    .isEmail()
    .withMessage('Enter Valid Email!'),
    check('userMobile')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Phone Number is required!')
    .isLength({ min:10 , max:10 })
    .withMessage('Phone Number must be 10 Digit long!')
    .isNumeric()
    .withMessage('Phone Number can be only in digit'),
    check('userPassword')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Password is required!')
    .isLength({ min:8 })
    .withMessage('Password must be 8 Character Long!')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/,)
    .withMessage('Please enter 1 Special Character, 1 Capital 1, Numeric 1 Small'),
    
]