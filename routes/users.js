const express = require("express");
const bcrypt = require("bcrypt");
const { User, validate } = require("../models/User");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  const existingEmail = await User.findOne({ email: req.body.email });
  if (existingEmail) return res.status(400).send("User already registrered");

  const user = new User(req.body);
  const salt = await bcrypt.genSalt();
  user.password = await bcrypt.hash(user.password, salt);

  user.save();

  const { password, ...userWithOutPassword } = user.toObject();
  const token = jwt.sign(userWithOutPassword, process.env.JWT_SECRET);

  return res
    .status(201)
    .header("x-auth-token", token)
    .send(userWithOutPassword);
});

module.exports = router;
