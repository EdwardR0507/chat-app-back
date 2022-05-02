const User = require("../models/user");
const {
  encryptPassword,
  generateJWT,
  comparePassword,
} = require("../utils/utils");

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
    user.password = encryptPassword(password);

    // Save user in DB
    await user.save();

    // Generate token
    const token = await generateJWT(
      { uid: user.id },
      process.env.SECRET_JWT_KEY,
      "2h"
    );

    res.status(201).json({
      ok: true,
      message: "User created successfully",
      token,
      user,
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

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "The email or password is incorrect",
      });
    }

    // Compare password
    const validPassword = comparePassword(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "The email or password is incorrect",
      });
    }

    // Generate token
    const token = await generateJWT(
      { id: user.id },
      process.env.SECRET_JWT_KEY,
      "2h"
    );

    res.status(200).json({
      ok: true,
      message: "User logged successfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error in the server",
    });
  }
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
