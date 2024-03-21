var express = require("express");
var Sequelize = require("sequelize");
var session = require("express-session");

// initalize sequelize with session store
var SequelizeStore = require("connect-session-sequelize")(session.Store);

// create database, ensure 'sqlite3' in your package.json
var sequelize = new Sequelize("social", "root", "1234", {
  dialect: "mysql",
});
module.exports = sequelize;
