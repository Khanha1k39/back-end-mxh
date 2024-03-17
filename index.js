const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const loginRoute = require("./routers/login");
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Origin", "GET,POST,PUT,DELETE,PATCH");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type ,Authorization ");
//   next();
// });
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(loginRoute);
app.listen(8080);
