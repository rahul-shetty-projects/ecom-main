const router = require("express").Router();

const auth = require('../middleware/auth');

const { createOrder,getAllOrders,getOrderForCustomer,getOrderDetails,deleteOrder } = require('../controller/order.controller');
const { orderValidator,orderValidationResult } = require('../validators/order.validation');

router.post('/create-order',auth ,createOrder);
router.get('/get-all-orders',auth,getAllOrders);
router.get('/get-orders-for-customer/:id',auth,getOrderForCustomer);
router.get('/get-orders-details',auth,getOrderDetails);
router.delete('/delete-order/:id',auth,deleteOrder);

module.exports = router;