// const db = require("./../util/database");
// module.exports = class Post {
//   constructor(id, name, email, password) {
//     this.id = id;
//     this.name = name;
//     this.email = email;
//     this.password = password;
//   }
//   static fetchAll() {
//     return db.execute("SELECT * FROM posts");
//   }
// };

// const Post = sequelize.define("post", {
//   id: {
//     ty: Sequelize.INTEGER,
//     autoIncrement:true;
//     allowNull: false,
//     primaryKey: true,
//   },
//   desc: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
// });

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./../util/sequelize");
const Post = sequelize.define("post", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  desc: {
    type: DataTypes.STRING,
  },
  imgUrl: {
    type: DataTypes.STRING,
  },
});

module.exports = Post;
