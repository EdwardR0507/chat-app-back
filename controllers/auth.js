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

    res.status(201).json({
      ok: true,
      message: "User created successfully",
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
      { uid: user.id },
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
  try {
    const { uid } = req;
    const token = await generateJWT({ uid }, process.env.SECRET_JWT_KEY, "2h");
    const user = await User.findById(uid);
    res.status(200).json({
      ok: true,
      message: "Token revalidated successfully",
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

module.exports = {
  createUser,
  loginUser,
  tokenRevalidation,
};
