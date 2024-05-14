const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const authRoute = require("./routers/Auth");
const userRoute = require("./routers/user");
const searchRoute = require("./routers/Search");
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
const jwt = require("jsonwebtoken");
const messageRoute = require("./routers/Message");
const Message = require("./models/Message");
const protectRoute = require("./middlewares/ProtectRoute");
var cookieParser = require("cookie-parser");

app.use(bodyParser.json());
app.use(cookieParser());

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
// app.use(protectRoute);
app.use(userRoute);
app.use(postRoute);
app.use(authRoute);
app.use(searchRoute);
app.use("/message", messageRoute);
User.hasMany(Post);
Post.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.belongsToMany(User, { as: "receiver", through: Message });
sequelize
  .sync({ force: false })
  .then((result) => {
    app.listen(8080);
  })
  .catch((err) => {
    console.log(err);
  });
