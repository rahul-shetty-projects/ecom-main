const { check, validationResult } = require('express-validator');

exports.orderValidationResult = (req,res,next) =>{
    const result = validationResult(req)
    if(!result.isEmpty()){
        const error = result.array()[0].msg;
        return res.status(422).json({success: false, error: error})
    }
    next();
}

exports.orderValidator = [
    check('orders')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Minimum One Order is required!')
    
]