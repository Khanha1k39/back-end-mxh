const { Op } = require("sequelize");
const { validationResult } = require("express-validator");

const jwt = require("jsonwebtoken");
const User = require("./../models/User");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const mailService = require("./../services/emailServies");
const { json } = require("body-parser");
const { use } = require("../routers/Auth");
const e = require("express");
exports.postLogin = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        return res.status(400).json("This email does not exist");
      }
      console.log(req.body.password);
      console.log(user);
      // console.log(user.getDataValue("password"));
      bcrypt
        .compare(req.body.password, user.getDataValue("password"))
        .then((result) => {
          console.log(result);
          if (result) {
            const token = jwt.sign({ email: user.email }, "mySecretKey");
            req.session.isLoggedin = true;
            req.session.user = user;
            res.cookie("jwt", token, {
              httpOnly: true,
              maxAge: 24 * 60 * 60 * 1000,
            });
            res.json({ email: user.email, token });
          } else {
            res.status(401).json("Password is wrong");
          }
        });
    })

    .catch((err) => console.log(err));
};
// exports.getLogin = (req, res, next) => {
//   console.log(req.session);
//   res.json();
// };
exports.postSignUp = async (req, res, next) => {
  // const error = validationResult(req);
  // console.log(error);
  // if (!error.isEmpty()) {
  //   return res.status(422).json({});
  // }
  // try {
  //   User.findOne({ where: { email: req.body.email } })
  //     .then((user) => {
  //       if (user) {
  //         console.log(user);
  //         return res.status(400).json();
  //       }
  //       console.log("bam");
  //       return bcrypt.hash(req.body.password, 12);
  //     })
  //     .then((hashedPassword) => {
  //       User.create({
  //         name: req.body.name,
  //         email: req.body.email,
  //         password: hashedPassword,
  //       })
  //         .then(() => {
  //           res.status(201).json();
  //         })
  //         .catch((err) => {
  //           console.log("day");
  //           console.log(err);
  //           console.log("day");
  //           res.status(500).json({ error: "internal server error " });
  //         });
  //     })

  //     .catch((err) => {
  //       console.log("day");

  //       console.log(err);
  //       console.log("day");
  //     });
  // } catch (error) {
  //   console.log("day");

  //   console.log(error);
  //   console.log("day");

  //   res.status(500).json({ error: "internal server error " });
  // }
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (user) {
      return res.status(400).json();
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    const result = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    res.status(201).json(result);
  } catch (error) {
    console.log("day");

    console.log(error);
    console.log("day");

    res.status(500).json({ error: "internal server error " });
  }
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
          res.status(400).json();
        }
        const token = buf.toString("hex");
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        user.save().then((result) => {
          mailService({
            from: '" Mạng xã hội  👻" <duongkhanhb1k39@gmail.com>', // sender address
            to: user.email,
            subject: "Đặt lại mật khẩu",
            text: "Hello world?",
            html: `<b>Vào <a href = "http://localhost:3000/reset/${token}"> link </a> sau để đặt lại mật khẩu?</b>`, // html body})
          }).then(() => {
            res.status(201).json();
          });
        });
      });
    })

    .catch((err) => {
      // console.log(err);
    });
};
exports.postChangePassWord = (req, res, next) => {
  const token = req.params.token;
  const password = req.body.password;
  User.findOne({
    where: { resetToken: token, resetTokenExpiration: { [Op.gt]: Date.now() } },
  })
    .then((user) => {
      console.log(user);
      if (!user) {
        return res.json("Invalid token");
      } else {
        bcrypt
          .hash(password, 12)
          .then((hashedPassword) => {
            user.password = hashedPassword;
            return user.save();
          })
          .then((user) => {
            console.log(user);
            return res.json({ message: "success" });
          });
      }
    })

    .catch((err) => console.log(err));
};
exports.postLogout = (req, res, next) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.send("succeess");
};
