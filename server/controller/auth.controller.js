require('../models/user');

const mongoose = require('mongoose');
const _ = require('lodash');
const nodemailer = require("../config/nodemailer.config");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = mongoose.model('User');

module.exports.registerUser = async (req,res,next) => {
    let user = await User.findOne({ userEmail: req.body.userEmail });
    if (user) {
        return res.status(400).send({message:'User already exisits with this Email Id!'});
    } else {

    // Insert the new user if they do not exist yet
    user = new User(_.pick(req.body, ['firstName','lastName', 'userEmail','userMobile', 'userPassword','userType','userStatus','cart','userRole','occupation','gender']));
    await user.save((err)=>{
        if(err){
            res.status(500).send({ message: err });
            return;
        }
        res.status(200).send({message:'Registered Successfully'});
    });
    }
}

module.exports.loginUser = async (req,res,next) => {
        // First Validate The HTTP Request
        if(req.body.userEmail == undefined || req.body.userEmail == ''){
            return res.status(400).send({message:'Email is required'});
        }
        if(req.body.userPassword == undefined || req.body.userPassword == ''){
            return res.status(400).send({message:'Password is required'});
        }
        //  Now find the user by their email address
        let user = await User.findOne({ userEmail: req.body.userEmail });
        if (!user) {
            return res.status(400).send({message:'Incorrect email or password.'});
        }
        if(user.userStatus != true){
            return res.status(401).send({
                message: "Account is Not Active , Please contact Admin!",
              });
        }
    
        // Then validate the Credentials in MongoDB match
        // those provided in the request
        const validPassword = await bcrypt.compare(req.body.userPassword, user.userPassword);
        if (!validPassword) {
            return res.status(400).send({message:'Incorrect email or password.'});
        }
        let userr = await User.updateOne({userEmail: req.body.userEmail},{$set:{cart:[]}});
        const token = jwt.sign({ _id: user._id,userName: user.userName, userEmail: user.userEmail,userMobile : user.userMobile,
            userType: user.userType,userRole:user.userRole }, process.env.JWT_PRIVATE_KEY,{expiresIn:'1y'});
        res.status(200).send({token:token,userId: user._id,message:"Login Successfully"});
}

// module.exports.verifyUser = async (req, res, next) => {
//     let user = await User.findOne({ confirmationCode : req.params.confirmationCode});
//     if (!user) {
//         return res.status(404).send({ message: "User Not found." });
//     }
//     let active = await User.updateOne({confirmationCode : req.params.confirmationCode},{$set:{confirmationStatus : "Active"}})
//     return res.status(200).send({message:"Your Account is now Active ! Please Login"});
// }

module.exports.forgotPassword = async (req, res, next) => {
    if(req.body.userEmail == undefined || req.body.userEmail == ''){
        return res.status(400).send({message:'Email is required'});
    }
    let user = await User.findOne({ userEmail: req.body.userEmail });
    if (!user) {
        return res.status(400).send({message:'Account Not Found'});
    }
    const otp = jwt.sign({userEmail: req.body.userEmail}, process.env.SECRET_TOKEN);
    let active = await User.updateOne({userEmail: req.body.userEmail},{$set:{confirmationCode : otp}})
    nodemailer.sendForgotPasswordEmail(
        user.userName,
        user.userEmail,
        otp
    );
    res.status(200).send({message:"Please check you email"});
}

module.exports.confirmForgotPassword = async (req, res, next) => {
    if(req.body.userPassword == undefined || req.body.userPassword == ''){
        return res.status(400).send({message:'Password is required'});
    }
    let user = await User.findOne({ confirmationCode : req.params.confirmationCode});
    if (!user) {
        return res.status(404).send({ message: "User Not found." });
    }
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.userPassword, salt);
    let active = await User.updateOne({confirmationCode : req.params.confirmationCode},{$set:{userPassword : user.password}})
    return res.status(200).send({message:"Password Changed Successfully"});
}

module.exports.allUsers = async (req, res, next) => {
    let users = await User.find({});
    if(!users){ return res.status(400).send({message:"No Users Found"}); }
    return res.status(200).send({data:users,count:users.length,message:"All Users Fetched Successfully"});
}

module.exports.newPassword = async (req, res, next) => {
    if(req.body.userPassword == undefined || req.body.userPassword == ''){
        return res.status(400).send({message:'Password is required'});
    }
    let user = await User.findOne({ userEmail : req.body.userEmail});
    if (!user) {
        return res.status(404).send({ message: "User Not found." });
    }
    if(String(req.body.userEmail).toLowerCase() == "admin@gmail.com"){
        return res.status(400).send({ message: "Admin Password Cannot be Changed" });
    }
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.userPassword, salt);
    let active = await User.updateOne({userEmail : req.body.userEmail},{$set:{userPassword : user.password}})
    return res.status(200).send({message:"Password Changed Successfully"});
}

