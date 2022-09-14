const express = require("express");
const router = express.Router();

// Tagit in min fakeCategory array
const categories = [
  { _id: "5b21ca3eeb7f6fbccd471818", name: "Fruit" },
  { _id: "5b21ca3eeb7f6fbccd471814", name: "Snacks" },
  { _id: "5b21ca3eeb7f6fbccd471820", name: "Vegetables" },
];

router.get("/", (req, res) => {
  return res.send(categories);
});

router.get("/:id", (req, res) => {
  const category = categories.find(
    (category) => category._id === req.params.id
  );

  if (!category)
    return res
      .status(404)
      .send("The category with the given id was not found.");

  return res.send(category);
});

module.exports = router;
exports.categories = categories;
