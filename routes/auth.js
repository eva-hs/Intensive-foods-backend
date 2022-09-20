const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const { User } = require("../models/User");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid username or password");

  const valid = await bcrypt.compare(req.body.password, user.password);
  if (!valid) return res.status(400).send("Invalid username or password");

  const { password, ...userWithOutPassword } = user.toObject();
  const token = jwt.sign(userWithOutPassword, process.env.JWT_SECRET);

  return res.send(token);
});

function validate(user) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
  });
  return schema.validate(user);
}

module.exports = router;
