const express = require("express");
const { Category } = require("../models/Category");
const router = express.Router();

router.get("/", async (req, res) => {
  const categories = await Category.find();
  return res.send(categories);
});

router.get("/:id", async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category)
    return res
      .status(404)
      .send("The category with the given id was not found.");

  return res.send(category);
});

module.exports = router;
