const nodemailer = require("nodemailer");

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000);
}

async function sendOTP(email) {
  const otp = generateOTP();

  let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
      user: "manowealth@iitp.ac.in",
      pass: "CRwnf613#@!",
    },
  });

  let info = await transporter.sendMail({
    from: '"Your Name" <your_email@example.com>',
    to: email,
    subject: "OTP Verification",
    text: `Your OTP is: ${otp}`,
  });

  //console.log("Message sent: %s", info.messageId);
  //console.log(`OTP sent to ${email}: ${otp}`);

  return otp;
}

module.exports = { sendOTP };
