const { check, validationResult } = require('express-validator');

exports.productValidationResult = (req,res,next) =>{
    console.log(req);
    const result = validationResult(req)
    if(!result.isEmpty()){
        const error = result.array()[0].msg;
        return res.status(422).json({success: false, error: error})
    }
    next();
}

exports.productValidator = [
    check('productName')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Product Name is required!'),
    check('productCategory')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Product Category is required!'),
    check('productSubCategory')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Product Sub Category is required!'),
    check('productPrice')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Product Price is required!'),
    check('productDescription')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Product Description is required!'),
    
    
]