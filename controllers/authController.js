const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

exports.signUp = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      username,
      password: hashPassword,
    });

    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (e) {
    console.log("Error: ", e);
    res.status(400).json({
      status: "fail",
    });
  }
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    const isCorrect = await bcrypt.compare(password, user.password);

    if (!isCorrect) {
      return res.status(400).json({
        status: "fail",
        message: "Password is incorrect",
      });
    }

    res.status(200).json({
      status: "success",
    });
  } catch (e) {
    console.log("Error: ", e);
    res.status(400).json({
      status: "fail",
    });
  }
};
