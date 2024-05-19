// models/Conversation.js
const { DataTypes } = require("sequelize");
const sequelize = require("./../util/sequelize");
const User = require("./User");

const Conversation = sequelize.define(
  "Conversation",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user1_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    user2_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
    tableName: "conversations",
    indexes: [
      {
        unique: true,
        fields: ["user1_id", "user2_id"],
      },
    ],
  }
);

module.exports = Conversation;
