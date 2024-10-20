import nodemailer from 'nodemailer';
import env from "dotenv"
env.config();
function email(email,subject,textMessage,name,otp){
    var transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      service: 'gmail',
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_SEND_EMAIL,
        pass: process.env.MAIL_SEND_PASSWORD
      }
    });
    var mailOptions = {
      from: process.env.MAIL_SEND_EMAIL,
      to: email,
      subject: subject,
      text:textMessage
    };
    transporter.sendMail(mailOptions, function (error, info){
        error ? console.log(error):response.send("Email has been sent to the user")
    });
    return true;
}
export default email;