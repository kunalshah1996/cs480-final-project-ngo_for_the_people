const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models/index.js");

const User = db.user;

exports.login = async (req, res) => {
  console.log("req body" + req.body)
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email: email } });

    if (!existingUser) return res.status(404).send({ message: "User does not exist." });

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials." });

    const token = jwt.sign({ email: existingUser.email, id: existingUser._id}, "SECRET_KEY", {
      expiresIn: "1h",
    });

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ error:error.message, message: "Something went wrong." });
  }
};

exports.register = async (req, res) => {
  const { email, password, username} = req.body;

  try {
    const existingUser = await User.findOne({ where: { email: email } });

    if (existingUser) return res.status(409).json({ message: "User already exists." });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      username,
      email,
      password: hashedPassword
    });

    const token = jwt.sign({ email: result.email, id: result._id }, "SECRET_KEY", {
      expiresIn: "1h",
    });

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

exports.findAll = (req, res) => {
  User.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};
