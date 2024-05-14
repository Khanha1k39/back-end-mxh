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
      message: "em an com chua",
      userId: req.user.id,
      receiverId,
    });
    res.send("haha");
  } catch (error) {
    console.log(error);
    res.status(500).json("internal server error");
  }
};
exports.getMessages = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      res.status(400).json({ error: "User not found" });
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
    res.status(500).json("internal server error");
  }
};
