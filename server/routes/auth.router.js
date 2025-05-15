const router = require("express").Router();
const { registerUser,loginUser,verifyUser,forgotPassword,confirmForgotPassword,allUsers,newPassword } = require('../controller/auth.controller');
const { registerValidator,registerValidationResult } = require('../validators/register.Validation');

router.post('/register',registerValidator,registerValidationResult,registerUser);
router.post('/login',loginUser);
// router.get('/confirm/:confirmationCode', verifyUser);
router.post('/forgot-password',forgotPassword);
router.post('/confirm-forgot-password-otp/:confirmationCode',confirmForgotPassword);
router.get('/all-users',allUsers);
router.post('/new-password',newPassword);

module.exports = router;