const { Category } = require("../models/Category");
const { Food, validate } = require("../models/Food");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const foods = await Food.find();
  return res.send(foods);
});

router.get("/:id", async (req, res) => {
  const food = await Food.findById(req.params.id);

  if (!food)
    return res
      .status(404)
      .send("The food with the given status id was not found");
  return res.send(food);
});

router.post("/", [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  const category = await Category.findById(req.body.categoryId);
  if (!category)
    return res
      .status(404)
      .send("The category with the given id was not found.");

  const food = new Food({
    name: req.body.name,
    category: category,
    numberInStock: req.body.numberInStock,
    price: req.body.price,
  });

  await food.save();

  return res.send(food);
});

router.put("/:id", [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  const category = await Category.findById(req.body.categoryId);
  if (!category)
    return res
      .status(404)
      .send("The category with the given id was not found.");

  const food = await Food.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    category: category,
    numberInStock: req.body.numberInStock,
    price: req.body.price,
  });

  if (!food)
    return res
      .status(404)
      .send("The food with the given status id was not found");

  return res.send(food);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const food = await Food.findByIdAndDelete(req.params.id);

  if (!food)
    return res
      .status(404)
      .send("The food with the given status id was not found");

  return res.send(food);
});

module.exports = router;
