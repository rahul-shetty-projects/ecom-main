const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderById:{
        type: String,
        required: [true,'Order By Id is required']
    },
    orderBy: {
        type: String,
        required: [true, 'Order By is Required']
    },
    productOrderedId: {
        type: String,
        required: [true, 'Product Id is required']
    },
    productName: {
        type: String,
    },
    country:{
        type:String
    },
    productDescription : {
        type: String,
    },
    productImage:{
        type: String
    },
    orderDate: {
        type: Date,
        required: [true, 'Order Date is required']
    },
    orderPrice: {
        type: String,
        required: [true, 'Order Price is required']
    },
    orderRating: {
        type: String,
    },
    orderDelivered: {
        type: Boolean
    },
    orderPaymentStatus : {
        type: Boolean
    }
},{
    timestamps: true
});

const Order = mongoose.model('Order',orderSchema);