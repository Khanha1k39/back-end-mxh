const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./../util/sequelize");
const Message = sequelize.define("message", {
  //   id: {
  //     type: DataTypes.INTEGER,
  //     autoIncrement: true,
  //     primaryKey: true,
  //     allowNull: false,
  //   },
  //   senderId: {
  //     type: DataTypes.INTEGER,
  //   },
  //   receiverId: {
  //     type: DataTypes.INTEGER,
  //   },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Message;
