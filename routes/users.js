const express = require("express");
const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const { User, validate } = require("../models/User");
const router = express.Router();

// router.get("/me", auth, async (req, res) => {
//   const user = await User.findById(req.user._id).select("-password");
//   if (!user) return res.status(404).send("User not found");

//   res.send(user);
// });

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  const existingEmail = await User.findOne({ email: req.body.email });
  if (existingEmail) return res.status(400).send("User already registrered");

  const user = new User(req.body);
  const salt = await bcrypt.genSalt();
  user.password = await bcrypt.hash(user.password, salt);

  user.save();

  // Denna rad används då vi returnerar objektet i send nedan,
  // men frontenden tar endast emot token från header.
  const { password, ...userWithOutPassword } = user.toObject();
  const token = user.generateJwtAuthToken();

  return res
    .status(201)
    .header("x-auth-token", token)
    .send(userWithOutPassword);
});

module.exports = router;
