const nodemailer = require("nodemailer");
require("dotenv").config();

module.exports = async (maiilDetail) => {
  console.log(maiilDetail);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "duongkhanhb1k39@gmail.com",
      pass: "djnxgqlgypidnyyq",
    },
  });
  console.log(maiilDetail);
  const info = await transporter.sendMail(maiilDetail);
};
