const Message = require("../models/Message");
const User = require("../models/User");
const { Op } = require("sequelize");

exports.sendMessage = async (req, res) => {
  try {
    const receiverId = req.params.userId;
    const user = await User.findOne({ where: { id: receiverId } });
    if (!user) {
      res.status(400).json({ error: "Receiver not found" });
      return;
    }
    await Message.create({
      message: req.body.message,
      userId: req.user.id,
      receiverId,
    });
    res.send("Success");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
exports.getConversations = async (req, res) => {
  try {
    console.log("day");

    const users = await User.findAll();

    console.log("day");
    res.json(users);
  } catch (error) {
    res.status(400).json({ error });
  }
};
exports.getMessages = async (req, res) => {
  try {
    console.log("requset ne");
    const { userId } = req.params;
    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      res.status(400).json({ error: "User not found ne" });
      return;
    }

    const messages = await Message.findAll({
      attributes: [
        "message",
        ["userId", "senderId"],
        "receiverId",
        "createdAt",
        "updatedAt",
      ],

      where: {
        [Op.or]: [
          { userId: req.user.id, receiverId: userId },
          { userId: userId, receiverId: req.user.id },
        ],
      },
    });
    res.json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json("internal server error send message");
  }
};
