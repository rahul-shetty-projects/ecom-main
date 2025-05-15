require('../models/user');

const mongoose = require('mongoose');
const _ = require('lodash');
const nodemailer = require("../config/nodemailer.config");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = mongoose.model('User');

module.exports.addNewUser = async (req,res,next) => {
    let user = await User.findOne({ userEmail: req.body.userEmail });
    if (user) {
        return res.status(400).send({message:'That user already exisits!'});
    } else {
    user = new User(_.pick(req.body, ['firstName', 'lastName','userEmail','userMobile', 'userPassword','userType','userRole','userStatus','occupation','gender','lastLoginTime','confirmationCode']));
    await user.save((err)=>{
        if(err){
            res.status(500).send({ message: err });
            return;
        }
        res.send(_.pick(user, ['userName', 'userEmail','userMobile', 'userPassword','userType','userStatus','lastLoginTime']));    });
    }
}

module.exports.addToCart = async (req,res,next) => {
    if(req.body._id != req.user._id){
        return res.status(400).send({message:'Not Authorized!'});
    }
    let user = await User.findOne({_id:req.user._id});
    if(user.cart.length>0){
        for(let i=0;i<user.cart.length;i++){
            if(user.cart[i].productName == req.body.product.productName){
                return res.status(200).send({message:"Product Added To Cart"})       
            }
        }
    }
    User.updateOne({ _id: req.body._id }, { "$push": { "cart":  req.body.product  }}, { safe: true, multi:false }, function(err, obj) {
        return res.status(200).send({message:"Product Added To Cart"})
    },err=>{
        return res.status(400).send({message:'Not Able to Add'});
    });
}

module.exports.getCartProducts = async (req,res,next) => {
    if(req.user._id != req.params.id && req.user.userEmail != 'admin@gmail.com'){
        return res.status(400).send({message:'No Data Found'});
    }
    let user = await User.findOne({_id:req.params.id},{"cart.createdAt":0,"cart.updatedAt":0});
    if(user.cart.length <=0){
        return res.status(200).send({message:'No Product in Cart'}); 
    }else{
        return res.status(200).send({products:user.cart,count:user.cart.length,message:'Cart Data Found'});
    }
}

module.exports.removeFromCart = async (req,res,next) => {
    if(req.params.userid != req.user._id){
        return res.status(400).send({message:'Not Authorized!'});
    }
    User.updateOne({ _id: req.params.userid }, { "$pull": { "cart": { "_id": req.params.id } }}, { safe: true, multi:false }, function(err, obj) {
        return res.status(200).send({message:'Product Removed from cart'});
    });
}

module.exports.getCartCount = async (req,res,next) => {
    if(req.user._id != req.params.id && req.user.userEmail != 'admin@gmail.com'){
        return res.status(400).send({message:'No Data Found'});
    }
    let user = await User.findOne({_id:req.params.id});
    if(user.cart.length <=0){
        return res.status(200).send({message:'No Product in Cart'}); 
    }else{
        return res.status(200).send({count:user.cart.length,message:'Cart Data Found'});
    }
}

module.exports.logout = async (req,res,next) => {
    let user = await User.updateOne({_id:req.user._id},{$set:{cart:[]}});
    return res.status(200).send({message:'Logout Successfully'});
}