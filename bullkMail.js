const nodemailer = require('nodemailer');
require('dotenv').config();
const sendBulkEmail = async (recipients, subject, body) => {
    try {
        let transporter = nodemailer.createTransport({
            host: "smtp-mail.outlook.com",
            port: 587,
            secure: false,
            auth: {
              user : process.env.EMAIL_USER,
              pass : process.env.EMAIL_PASS,
            },
          });
        
  
     const reesult =  await transporter.sendMail({
        from: 'manowealth@iitp.ac.in',
        to: recipients.join(','),  
        subject,
        text: body,
      });
  
      console.log(reesult)
      console.log('Bulk email sent');
    } catch (error) {
      console.error('Error sending bulk email:', error);
    }
  };

  module.exports=sendBulkEmail;