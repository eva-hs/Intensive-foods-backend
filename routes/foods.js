const joi = require("joi");
// const { categories } = require("./categories");
const express = require("express");
const router = express.Router();

// Tagit in min fakeFoods array
const foods = [
  {
    _id: "5b21ca3eeb7f6fbccd471815",
    name: "Apple",
    category: { _id: "5b21ca3eeb7f6fbccd471818", name: "Fruit" },
    numberInStock: 6,
    price: 10,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471816",
    name: "Banana",
    category: { _id: "5b21ca3eeb7f6fbccd471818", name: "Fruit" },
    numberInStock: 5,
    price: 15,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471817",
    name: "Cucumber",
    category: { _id: "5b21ca3eeb7f6fbccd471820", name: "Vegetables" },
    numberInStock: 8,
    price: 7,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471819",
    name: "Chips",
    category: { _id: "5b21ca3eeb7f6fbccd471814", name: "Snacks" },
    numberInStock: 7,
    price: 12,
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181a",
    name: "Cookies",
    category: { _id: "5b21ca3eeb7f6fbccd471814", name: "Snacks" },
    numberInStock: 7,
    price: 8,
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181b",
    name: "Muffins",
    category: { _id: "5b21ca3eeb7f6fbccd471814", name: "Snacks" },
    numberInStock: 7,
    price: 13,
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181e",
    name: "Carrot",
    category: { _id: "5b21ca3eeb7f6fbccd471820", name: "Vegetables" },
    numberInStock: 7,
    price: 7,
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181f",
    name: "Sallad",
    category: { _id: "5b21ca3eeb7f6fbccd471820", name: "Vegetables" },
    numberInStock: 4,
    price: 14,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471821",
    name: "Orange",
    category: { _id: "5b21ca3eeb7f6fbccd471818", name: "Fruit" },
    numberInStock: 7,
    price: 20,
  },
];

// Jag lyckas inte flytta ut min fake categories array för då får jag
// undefined när jag ska hämta upp category i post och put nedan.
const categories = [
  { _id: "5b21ca3eeb7f6fbccd471818", name: "Fruit" },
  { _id: "5b21ca3eeb7f6fbccd471814", name: "Snacks" },
  { _id: "5b21ca3eeb7f6fbccd471820", name: "Vegetables" },
];

router.get("/", (req, res) => {
  return res.send(foods);
});

router.get("/:id", (req, res) => {
  const food = foods.find((food) => food._id === req.params.id);

  if (!food)
    return res
      .status(404)
      .send("The food with the given status id was not found");
  return res.send(food);
});

router.post("/", (req, res) => {
  const { error } = validateFood(req.body);

  if (error) return res.status(400).send(error.message);

  const food = {
    name: req.body.name,
    category: categories.find(
      (category) => category._id === req.body.categoryId
    ),
    numberInStock: req.body.numberInStock,
    price: req.body.price,
  };
  foods.push(food);
  return res.send(food);
});

router.put("/:id", (req, res) => {
  const { error } = validateFood(req.body);

  if (error) return res.status(400).send(error.message);

  let food = foods.find((food) => food._id === req.params.id);

  if (!food)
    return res
      .status(404)
      .send("The food with the given status id was not found");

  const index = foods.indexOf(food);

  foods[index] = {
    _id: req.body._id,
    name: req.body.name,
    category: categories.find(
      (category) => category._id === req.body.categoryId
    ),
    numberInStock: req.body.numberInStock,
    price: req.body.price,
  };

  return res.send(foods[index]);
});

router.delete("/:id", (req, res) => {
  const food = foods.find((food) => food._id === req.params.id);

  if (!food)
    return res
      .status(404)
      .send("The food with the given status id was not found");

  const index = foods.indexOf(food);
  foods.splice(index, 1);

  return res.send(food);
});

function validateFood(food) {
  const schema = joi.object({
    name: joi.string().required().label("Name"),
    categoryId: joi.string().required().label("Category"),
    numberInStock: joi
      .number()
      .required()
      .min(0)
      .max(100)
      .label("Number in stock"),
    price: joi.number().required().min(0).max(10).label("Price"),
    _id: joi.string().allow(""),
  });
  return schema.validate(food);
}

module.exports = router;
