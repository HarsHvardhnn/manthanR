const nodemailer = require("nodemailer");

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000);
}

async function sendOTP(email ,otp) {
  // const otp = generateOTP();

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
    from: 'manowealth@iitp.ac.in',
    to: email,
    subject: "OTP Verification Code",
    text: `Dear User,\n\nYour OTP is: ${otp}\n\nThank you,\nManoWealth Team`,
  });

  //console.log("Message sent: %s", info.messageId);
  //console.log(`OTP sent to ${email}: ${otp}`);

  return otp;
}

module.exports = { sendOTP };
