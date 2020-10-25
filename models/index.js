const User = require("./User");
const Post = require("./Post");

//Define Model associations //create associations
User.hasMany(Post, {
  foreignKey: "User_id",
});

Post.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { User, Post };
