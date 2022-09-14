const logger = require("./middleware/logger");
const foods = require("./routes/foods");
const categories = require("./routes/categories");
const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);
app.use("/api/categories", categories);
app.use("/api/foods", foods);

mongoose
  .connect("mongodb://localhost/new-intensive-foods-node")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((error) => console.log("Could not connect to MongoDB...", error));

// async function createFood() {
//   const food = new Food({
//     name: "Cheese Doodles",
//     categoryId: "5b21ca3eeb7f6fbccd471814",
//     numberInStock: 45,
//     price: 23,
//   });

//   food.save();
// }

// createFood();

// async function getFoods() {
//   const foods = await Food.find();
//   console.log(foods);
// }

// getFoods();

// async function getFood(id) {
//   const foods = await Food.findById(id);
//   console.log(foods);
// }

// // getFood();
// getFood("6320bed66a905c6ed924ad9a");

// async function updateFood(food) {
//   await Food.findByIdAndUpdate(food._id, {
//     name: food.name,
//     categoryId: food.categoryId,
//     numberInStock: food.numberInStock,
//     price: food.price,
//   });
// }

// updateFood("6320bed66a905c6ed924ad9a", {
//   name: "Cheese Doodles",
//   categoryId: "5b21ca3eeb7f6fbccd471814",
//   numberInStock: 87,
//   price: 3,
// });

// async function deleteFood(id) {
//   await Food.findByIdAndDelete(id);
// }

// deleteFood("6320bed66a905c6ed924ad9a");

app.listen(8000, () => console.log("listening om port 8000"));
