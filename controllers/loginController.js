exports.postLogin = (req, res, next) => {
  console.log(req.body);
  res.status(200).json({ message: "Post succesfully" });
};
exports.getLogin = (req, res, next) => {
  res.json({ message: "ok" });
};
