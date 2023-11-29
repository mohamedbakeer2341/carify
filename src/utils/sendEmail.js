import nodemailer from "nodemailer";

export const sendEmail = async({to,subject,html})=>{
    const transporter = nodemailer.createTransport({
        host:"localhost",
        port:465,
        service:"gmail",
        secure:true,
        auth:{
            user:process.env.EMAIL,
            pass:process.env.PASS
        }
    })
    const info = await transporter.sendMail({
        from: `"Carify" ${process.env.EMAIL}`,
        to,
        subject,
        html
      })
    return info.accepted.length < 1 ? false : true;
}