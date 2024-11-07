import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

async function sendEmail(email, subject, message) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_SEND_EMAIL,
        pass: process.env.MAIL_SEND_PASSWORD,
      }
    });

    const mailOptions = {
      from: process.env.MAIL_SEND_EMAIL,
      to: email,
      subject: subject,
      text: message
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
}

export default sendEmail;
