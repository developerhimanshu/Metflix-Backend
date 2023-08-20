const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
  const nuser = req.body;

  //encrypting the password
  const salt = await bcrypt.genSalt(10);
  nuser.password = await bcrypt.hash(nuser.password, salt);

  const user = await User.create(nuser);

  const token = jwt.sign(
    { userId: user._id, name: user.name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
  res.status(200).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  const nuser = req.body;
  if (!nuser.email || !nuser.password) {
    return res.status(400).json({ msg: "Please enter a email and password" });
  }
  const user = await User.findOne({ email: nuser.email });
  if (!user) {
    return res.status(404).json({ userNotFound: "User doesn't exists." });
  }
  const isCorrectPass = await bcrypt.compare(nuser.password, user.password);
  if (!isCorrectPass) {
    return res.status(401).json({ incorrectPass: "Invalid password" });
  }
  const token = jwt.sign(
    { userId: user._id, name: user.name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
  res.status(200).json({ user: { name: user.name }, token });
};

module.exports = { login, register };
