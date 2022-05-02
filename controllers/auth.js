const bcrypt = require("bcryptjs");
const User = require("../models/user");

const createUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existEmail = await User.findOne({ email });
    if (existEmail) {
      return res.status(400).json({
        ok: false,
        msg: "The email already exists",
      });
    }

    const user = new User(req.body);

    // Encrypt password
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(password, salt);

    // Save user in DB
    await user.save();

    res.status(201).json({
      ok: true,
      message: "User created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error in the server",
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  res.status(200).json({
    ok: true,
    message: "User logged successfully",
    email,
    password,
  });
};

const tokenRevalidation = async (req, res) => {
  res.status(200).json({
    ok: true,
    message: "Token revalidated successfully",
  });
};

module.exports = {
  createUser,
  loginUser,
  tokenRevalidation,
};
