import nodemailer from 'nodemailer';
function email(email,subject,name,otp){
    let flag = false;
    var transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      service: 'gmail',
      port: 465,
      secure: true,
      auth: {
        user: 'zameeralam57@gmail.com',
        pass: 'Zamiralam@0511'
      }
    });
    var mailOptions = {
      from: 'zameeralam57@gmail.com@gmail.com',
      to: email,
      subject: subject,
      attecments:[{
        filename:example.pdf,
        path:'/public/invoices/'
      }],
      text:" Welcome "+name +" in a BookNest application hope you enjoying our services\nThis is your otp number "+otp
    };
  
    transporter.sendMail(mailOptions, function (error, info){
        error ? flag = false : flag = true;
    });
    return flag;
}
export default email;