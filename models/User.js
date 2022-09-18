const Joi = require("joi");
const mongoose = require("mongoose");
require("mongoose-type-email");

const userSchema = mongoose.Schema({
  name: String,
  email: { type: mongoose.SchemaTypes.Email, minlenth: 2, required: true },
  password: { type: String, minlength: 5, required: true },
});

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
