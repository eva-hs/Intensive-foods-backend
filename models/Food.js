const mongoose = require("mongoose");
const Joi = require("joi");
const { categorySchema } = require("./Category");

const foodSchema = mongoose.Schema({
  name: { type: String, required: true },
  category: { type: categorySchema, required: true },
  numberInStock: { type: Number, min: 0, max: 100, required: true },
  price: { type: Number, min: 0, max: 10, required: true },
});

const Food = mongoose.model("Food", foodSchema);

function validateFood(food) {
  const schema = Joi.object({
    name: Joi.string().required().label("Name"),
    categoryId: Joi.string().required().label("Category"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in stock"),
    price: Joi.number().required().min(0).max(10).label("Price"),
    _id: Joi.string().allow(""),
  });
  return schema.validate(food);
}

module.exports = {
  Food,
  validate: validateFood,
};
