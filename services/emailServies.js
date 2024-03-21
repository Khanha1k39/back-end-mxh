const nodemailer = require("nodemailer");
require("dotenv").config();

module.exports = async (maiilDetail) => {
  console.log(maiilDetail);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    // host: "smtp.gmail.com",
    // port: 587,
    // secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "duongkhanhb1k39@gmail.com",
      pass: "djnxgqlgypidnyyq",
    },
  });
  console.log(maiilDetail);
  const info = await transporter.sendMail(maiilDetail);
};
