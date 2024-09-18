
import nodemailer from 'nodemailer'

// email:user.email,
// subject:"Your resetToken (valid for 10 min)",
// message
const sendMail=async(opt)=>{
    const transport=nodemailer.createTransport({
        host: process.env.HOST,
        port: process.env.EMAIL_PORT  ,
        secure: false ,
      
        auth: {
          user: process.env.USER,
          pass:process.env.PASSWORD
        },
      });
      const mailOptions = {
        from: "Devendra wakarkar <devendrawakarkar7@gmail.com>",
        to: opt.email,
        subject: opt.subject,
        text: opt.message,
        
      };
  
      await transport.sendMail(mailOptions).catch(err => console.log(err));
    
    
}

export default sendMail