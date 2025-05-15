const router = require("express").Router();

const auth = require('../middleware/auth');

const { addNewProduct,getAllProducts,getProductDetail, deleteProduct } = require('../controller/product.controller');
const { productValidator,productValidationResult } = require('../validators/product.Validation');


require('../models/product');
const fs = require('fs');
const mongoose = require('mongoose');
const _ = require('lodash');
const Product = mongoose.model('Product');
const path = require('path');
// router.post('/add-product',auth,productValidator, productValidationResult ,addNewProduct);
router.post('/get-all-products',auth,getAllProducts);
router.get('/get-product-detail/:id',auth,getProductDetail);
router.delete('/delete-product/:id',auth,deleteProduct);

const MIME_TYPE_MAP = {
    'image/png':'png',
    'image/jpeg':'jpg',
    'image/jpg':'jpg'
}

const multer = require('multer');
const imageStorage = multer.diskStorage({
    // Destination to store image     
    destination: './uploads', 
      filename: (req, file, cb) => {
          cb(null, file.fieldname + '_' + Date.now() 
             + path.extname(file.originalname))
            // file.fieldname is name of the field (image)
            // path.extname get the uploaded file extension
    }
});

const imageUpload = multer({
    storage: imageStorage,
    limits: {
      fileSize: 1000000 // 1000000 Bytes = 1 MB
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) { 
         // upload only png and jpg format
         return cb(new Error('Please upload a Image'))
       }
     cb(undefined, true)
  }
}) 


  router.post('/add-product',auth ,imageUpload.single('productImage'),async (req,res)=>{
    // req.body.productImage = req.file.buffer
    // console.log(req.file)
    const url = req.protocol + '://'+req.get("host")+'/';
    // https://rahulshettyacademy.com/api/ecom/
    req.body.productImage =  'https://rahulshettyacademy.com/api/ecom/' + 'uploads/' + req.file.filename;
    if(req.user.userEmail != 'admin@gmail.com'){
      let productCount = await Product.find({productAddedBy:req.body.productAddedBy}).sort({"createdAt": -1});;
      if(productCount.length >=6){
          let del = await Product.deleteOne({_id:productCount[productCount.length-1]._id});
      }
    }
    else if(req.user.userEmail == 'admin@gmail.com'){
      let productCount = await Product.find({productAddedBy:req.body.productAddedBy}).sort({"createdAt": -1});;
      if(productCount.length >=3){
          let del = await Product.deleteOne({_id:productCount[productCount.length-1]._id});
      }
    }
    
    // let product = await Product.findOne({ productName: req.body.productName });
    // if (product) {
    //     return res.status(400).send({message:'Product already exisits!'});
    // } else {
    product = new Product(_.pick(req.body, ['productName', 'productCategory','productSubCategory', 'productPrice','productDescription',
    'productRating','productTotalOrders','productStatus','productFor','productImage','productAddedBy']));
    await product.save((err)=>{
        if(err){
            res.status(500).send({ message: err });
            return;
        }
        res.status(201).send({productId:product._id,message:'Product Added Successfully'});
    });
    // }
})


router.put('/update-product',auth ,imageUpload.single('productImage'),async (req,res)=>{
  let product = await Product.findOne({_id:req.body._id});
  if(!product){
    res.status(404).send({ message: 'No Product Found' });
  }
var result = product.productImage.split("/")[product.productImage.split("/").length - 1];
fs.unlinkSync('./uploads/'+result);

    const url = req.protocol + '://'+req.get("host")+'/';
    product.productImage =  'https://rahulshettyacademy.com/api/ecom/' + 'uploads/' + req.file.filename;
    await product.save((err)=>{
      if(err){
          res.status(500).send({ message: err });
          return;
      }
      res.status(201).send({productId:product._id,message:'Product Updated Successfully'});
  });
})


module.exports = router;