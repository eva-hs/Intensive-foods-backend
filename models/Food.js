const mongoose = require("mongoose");
const { categorySchema } = require("./Category");

const foodSchema = mongoose.Schema({
  name: { type: String, required: true },
  category: { type: categorySchema, required: true },
  numberInStock: { type: Number, min: 0, max: 100, required: true },
  price: { type: Number, min: 0, max: 10, required: true },
});

const Food = mongoose.model("Food", foodSchema);

exports.Food = Food;
