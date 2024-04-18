const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const authRoute = require("./routers/Auth");
const userRoute = require("./routers/user");
const Post = require("./models/Post");
const User = require("./models/User");
const sessionDb = require("./util/session");
const session = require("express-session");
const sequelize = require("./util/sequelize");
var SequelizeStore = require("connect-session-sequelize")(session.Store);
const postRoute = require("./routers/post");
const mailService = require("./services/emailServies");
const scrf = require("csurf");
const emailServies = require("./services/emailServies");
const multer = require("multer");
const scrfProtection = scrf();
const upload = multer({ dest: "uploads/" });
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));
// app.use(multer().single("image"));

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, authorization"
  );
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-METHODS",
    "GET, HEAD, POST, PUT, DELETE, TRACE, OPTIONS, PATCH"
  );
  next();
});
app.use(
  session({
    secret: "my secret",
    store: new SequelizeStore({
      db: sequelize,
    }),
    resave: false,
    saveUninitialized: false,
  })
);

//app.use(scrfProtection);
app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
      // console.log(user);
    })
    .catch((err) => {
      res.json(err);
    });
});
app.post("/postimage", upload.single("image"), (req, res, next) => {
  console.log(req.body);
  console.log(req.files);
  console.log(req);
  res.json({ message: "Successfully uploaded files" });
});
app.use(userRoute);
app.use(postRoute);
app.use(authRoute);
//test sendemail
app.use("/sendemail", (req, res, next) => {
  //test sendemail
  mailService({
    from: '" Mạng xã hội  👻" <duongkhanhb1k39@gmail.com>',
    to: "khanh.dq212846@sis.hust.edu.vn",
    subject: "Đặt lại mật khẩu",
    text: "Hello world?",
    html: `<b>Vào  sau để đặt lại mật khẩu?</b>`,
  })
    .then(() => {
      res.json("hh");
    })
    .catch((err) => {
      console.log(err);
    });
});

User.hasMany(Post);
Post.belongsTo(User, { constraints: true, onDelete: "CASCADE" });

sequelize
  .sync()
  .then((result) => {
    app.listen(8080);
  })
  .catch((err) => {
    console.log(err);
  });
