const User = require("../models/user");

const userLoggedIn = async (uid) => {
  const user = await User.findById(uid);
  user.online = true;
  await user.save();
  return user;
};

const userLoggedOut = async (uid) => {
  const user = await User.findById(uid);
  user.online = false;
  await user.save();
  return user;
};

const getUsers = async () => {
  const users = await User.find().sort("-online");
  return users;
};

module.exports = { getUsers, userLoggedIn, userLoggedOut };
