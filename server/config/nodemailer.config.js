
const nodemailer = require("nodemailer");

const user = process.env.email;
const pass = process.env.password;

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: user,
    pass: pass,
  },
});

// module.exports.sendConfirmationEmail = (name, email, confirmationCode) => {
//     transport.sendMail({
//       from: user,
//       to: email,
//       subject: "Please confirm your account",
//       html: `<h1>Email Confirmation</h1>
//           <h2>Hello ${name}</h2>
//           <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
//           <a href=http://localhost:4200/auth/confirm-account/${confirmationCode}> Click here</a>
//           </div>`,
//     }).catch(err => console.log(err));
//   };


  module.exports.sendForgotPasswordEmail = (name, email, confirmationCode) => {
    transport.sendMail({
      from: user,
      to: email,
      subject: "Please Reset your Password",
      html: `<h1>Password Reset</h1>
          <h2>Hello ${name}</h2>
          <p>Click on link to reset your password</p>
          <a href=http://localhost:4200/auth/confirm-forgot-password-otp/${confirmationCode}> Click here</a>
          </div>`,
    }).catch(err => console.log(err));
  };