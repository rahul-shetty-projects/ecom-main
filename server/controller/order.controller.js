require('../models/order');
require('../models/product');
require('../models/user');

const mongoose = require('mongoose');
const _ = require('lodash');
// const nodemailer = require("../config/nodemailer.config");

const Order = mongoose.model('Order');
const Product = mongoose.model('Product');
const User = mongoose.model('User');

module.exports.createOrder = async (req,res,next) => {
    let orderIds = [];
    let productOrderedId = [];
    let or = await Order.find({orderById:req.user._id}).sort({"createdAt": -1});
    if(or.length >= 7){
        for(let i=0;i<req.body.orders.length;i++){
            let del = await Order.deleteOne({_id:or[or.length-1]._id});
            or = await Order.find({orderById:req.user._id}).sort({"createdAt": -1});
        }
    }
    for(let i=0;i<req.body.orders.length;i++){
        let product = await Product.findOne({ _id: req.body.orders[i].productOrderedId });
        if(!product){
            return res.status(400).send({message:'Wrong Product ID'});
        }
        let temp = {
            orderById: req.user._id,
            orderBy: req.user.userEmail,
            orderDate: new Date(),
            orderPrice: product.productPrice,
            productOrderedId: req.body.orders[i].productOrderedId,
            productName: product.productName,
            productDescription: product.productDescription,
            productImage: product.productImage,
            country: req.body.orders[i].country
        }
        order = new Order(_.pick(temp, ['orderById','orderBy','orderDate','productOrderedId','productName','productDescription','productImage','orderPrice','orderRating','country']));
        orderIds.push(order._id);
        productOrderedId.push(order.productOrderedId);
        await order.save((err)=>{
            if(err){
                res.status(500).send({ message: err });
                return;
            }else{
                User.updateOne({ _id: req.user._id }, { "$pull": { "cart": { "_id": req.body.orders[i].productOrderedId } }}, { safe: true, multi:false }, function(err, obj) {     
            });
            }
        }); 
    }

    res.status(201).send({orders:orderIds,productOrderId:productOrderedId,message:'Order Placed Successfully'});



    // order = new Order(_.pick(req.body, ['orderById','orderBy','orderDate','productOrderedId','productName','productDescription','productImage','orderPrice','orderRating']));
    // await order.save((err)=>{
    //     if(err){
    //         res.status(500).send({ message: err });
    //         return;
    //     }else{
    //     User.updateOne({ _id: req.body.orderById }, { "$pull": { "cart": { "_id": req.body.productOrderedId } }}, { safe: true, multi:false }, function(err, obj) {
    //     res.status(200).send({data:order,message:'Order Placed Successfully'});     
    //     });
    //     }
    // });
}

module.exports.getAllOrders = async (req,res,next) => {
    let orders = await Order.find({"createdAt":0,"updatedAt":0});
    if(!orders){
        return res.status(400).send({message:'Orders Not Found'});
    }
    res.status(200).send({data:orders,count:orders.length,message:'All Orders fetched Successfully'});
}

module.exports.getOrderForCustomer = async (req,res,next) => {
    if(req.user._id != req.params.id && req.user.userEmail != 'admin@gmail.com'){
        return res.status(403).send({message:'You are not authorize to view these orders'});
    }
    let orders = await Order.find({ orderById : req.params.id },{"createdAt":0,"updatedAt":0});
    if (!orders) {
        return res.status(400).send({message:'Orders not found'});
    }
    if(orders.length==0){
        return res.status(200).send({data:orders,message:'No Orders'});
    }
    for(let i=0;i<orders.length;i++){
        orders[i].productOrderedId = orders[i].orderDate.toString().substring(0,10);
        orders[i].orderDate = null;
        if(i == orders.length - 1){
            return res.status(200).send({data:orders,count:orders.length,message:'Orders fetched for customer Successfully'});
        }
    }
}

module.exports.getOrderDetails = async (req,res,next) => {
    let order = await Order.findOne({ _id : req.query.id },{"createdAt":0,"updatedAt":0,"orderDate":0});
    if (!order) {
        return res.status(400).send({message:'Order not found'});
    }
    if(req.user._id != order?.orderById && req.user.userEmail != 'admin@gmail.com'){
        return res.status(403).send({message:'You are not authorize to view this order'});
    }
    res.status(200).send({data:order,message:'Orders fetched for customer Successfully'});
}

module.exports.deleteOrder = async (req,res,next) => {
    let or = await Order.findOne({ _id : req.params.id });
    if(!or){
        return res.status(400).send({message:'Order not found'});
    }
    else if(req.user._id != or?.orderById && req.user.userEmail != 'admin@gmail.com'){
        return res.status(400).send({message:'You are not authorize to delete this order'});
    }
    let order = await Order.deleteOne({_id: req.params.id});

    res.status(200).send({message:'Orders Deleted Successfully'});
}

