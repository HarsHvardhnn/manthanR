const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user:'manowealth@iitp.ac.in',
        pass: 'CRwnf613#@!',
      },
    });
    await transporter.sendMail({
      from: 'manowealth@iitp.ac.in',
      to,
      subject,
      text,
    });

    console.log('Email sent');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};




module.exports = sendEmail;