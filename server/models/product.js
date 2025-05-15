const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    productName: {
        type: String,
        required: [true, 'Product Name is required'],
        minlength: [3,'Product Name must be 3 to 20 characters long'],
        maxlength: [20,'Product Name must be 3 to 20 characters long']
    },
    productCategory: {
        type: String,
        required: [true, 'Product Category is required']
    },
    productSubCategory: {
        type: String,
        required: [true, 'Product Sub Category is required']
    },
    productPrice: {
        type: Number,
        required: [true, 'Product Price is required']
    },
    productDescription: {
        type: String,
        required: [true, 'Product Description is required']
    },
    productImage:{
            type: String,
    },
    productRating: {
        type: String,
        default:0
    },
    productTotalOrders: {
        type: String,
        default:0
    },
    productStatus: {
        type: Boolean,
        default: true
    },
    productFor: {
        type: String,
    },
    productAddedBy: {
        type: String
    }
},{
    timestamps: true
});

const Product = mongoose.model('Product',productSchema);