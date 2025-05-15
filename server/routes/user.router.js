const router = require("express").Router();

const { addNewUser,addToCart,getCartProducts,removeFromCart,getCartCount,logout } = require('../controller/user.controller');
const { registerValidator,registerValidationResult } = require('../validators/register.Validation');
const auth  = require('../middleware/auth');
const superadminauth = require('../middleware/roleauth');

router.post('/add-user',auth,registerValidator,registerValidationResult,addNewUser);
router.post('/add-to-cart',auth,addToCart);
router.get('/get-cart-count/:id',auth,getCartCount);
router.get('/get-cart-products/:id',auth,getCartProducts);
router.delete('/remove-from-cart/:userid/:id',auth,removeFromCart);
router.get('/logout',auth,logout);

module.exports = router;