const express = require("express");
const { User, validate } = require("../models/User");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  const existingEmail = await User.findOne({ email: req.body.email });
  if (existingEmail) return res.status(400).send("User already registrered");

  const user = new User(req.body);
  user.save();
  return res.status(201).send(user);
});

module.exports = router;
