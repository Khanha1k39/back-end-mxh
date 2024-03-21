// const db = require("./../util/database");
// module.exports = class User {
//   constructor(id, name, email, password) {
//     this.id = id;
//     this.name = name;
//     this.email = email;
//     this.password = password;
//   }
//   static fetchAll() {
//     return db.execute("SELECT * FROM users");
//   }
// };
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./../util/sequelize");
const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  resetToken: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  resetTokenExpiration: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

module.exports = User;
