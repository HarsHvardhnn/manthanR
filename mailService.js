const nodemailer = require("nodemailer");



async function notifyPsy(user ,email) {


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
    from: '"PIC Wellness" manowealth@iitp.ac.in',
    to: "abhisek_1921cs16@iitp.ac.in",
    subject: "Immediate attention is needed",
    text: `${user} needs your urgent help`,
  });

  // console.log("Message sent: %s", info.messageId);
  // console.log(`OTP sent to ${email}: ${otp}`);

 return 'sent'
}

module.exports = { notifyPsy };
