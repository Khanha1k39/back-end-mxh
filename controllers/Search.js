const User = require("../models/User");
const { Op } = require("sequelize");
exports.searchUser = async (req, res, next) => {
  const { name } = req.query;

  try {
    const users = await User.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
    });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
