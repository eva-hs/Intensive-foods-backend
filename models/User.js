const { boolean } = require("joi");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
require("mongoose-type-email");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: mongoose.SchemaTypes.Email, minlenth: 2, required: true },
  password: { type: String, minlength: 5, required: true },
  isAdmin: Boolean,
});

userSchema.methods.generateJwtAuthToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      isAdmin: this.isAdmin,
    },
    process.env.JWT_SECRET
  );
};

const User = mongoose.model("user", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(2),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
  });
  return schema.validate(user);
}

module.exports = {
  User,
  validate: validateUser,
};
