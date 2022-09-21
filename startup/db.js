const mongoose = require("mongoose");

function initDb() {
  mongoose
    .connect("mongodb://localhost/new-intensive-foods-node")
    .then(() => console.log("Connected to MongoDB..."))
    .catch((error) => console.log("Could not connect to MongoDB...", error));
}

module.exports = initDb;
