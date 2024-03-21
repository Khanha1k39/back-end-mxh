// exports.postLogin = (req, res, next) => {
//   console.log(req.body);
//   res.status(200).json({ message: "Post succesfully" });
// };
const User = require("./../models/User");
exports.getUsers = (req, res, next) => {
  User.findAll()
    .then((result) => {
      res.json(result);
    })
    .catch(() => {});
};
exports.postUsers = (req, res, next) => {
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  })
    .then(() => {
      res.json("suces user");
    })
    .catch(() => {
      res.json("error ");
    });
};
