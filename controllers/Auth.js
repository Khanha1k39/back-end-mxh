const { where } = require("sequelize");
const User = require("./../models/User");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const mailService = require("./../services/emailServies");
const { json } = require("body-parser");
exports.postLogin = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        res.status(400).json();
      }
      console.log(req.body.password);
      console.log(user.getDataValue("password"));
      bcrypt
        .compare(req.body.password, user.getDataValue("password"))
        .then((result) => {
          console.log(result);
          if (result) {
            req.session.isLoggedin = true;
            req.session.user = user;

            res.status(200).json({});
          } else {
            res.status(400).json({});
          }
        });
    })

    .catch((err) => console.log(err));
};
exports.getLogin = (req, res, next) => {
  console.log(req.session);
  res.json();
};
exports.postSignUp = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (user) {
        console.log(user);
        res.status(400).json();
      }
      return bcrypt.hash(req.body.password, 12);
    })
    .then((hashedPassword) => {
      mailService().then((rel) => {
        console.log(rel);
        User.create({
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword,
        });
      });
    })
    .then(() => {
      res.status(201).json();
    })
    .catch((err) => console.log(err));
};
exports.postResetPassWord = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        return res.status(400).json();
      }
      console.log(user);
      crypto.randomBytes(32, (err, buf) => {
        if (err) {
          json.status(400).json();
        }

        const token = buf.toString("hex");
        console.log(token);
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        user.save().then((result) => {
          mailService({
            from: '" Mạng xã hội  👻" <duongkhanhb1k39@gmail.com>', // sender address
            to: user.email, // list of receivers
            subject: "Đặt lại mật khẩu", // Subject line
            text: "Hello world?", // plain text body
            html: `<b>Vào <a href = "http://localhost:8080/reset/${token}"> link </a> sau để đặt lại mật khẩu?</b>`, // html body})
          });
        });
      });
    })

    .catch((err) => {
      console.log(err);
    });
};
