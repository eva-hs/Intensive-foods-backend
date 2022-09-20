const logger = require("./middleware/logger");
const users = require("./routes/users");
const foods = require("./routes/foods");
const categories = require("./routes/categories");
const auth = require("./routes/auth");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const express = require("express");
const { Category } = require("./models/Category");
const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(logger);
app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/categories", categories);
app.use("/api/foods", foods);

mongoose
  .connect("mongodb://localhost/new-intensive-foods-node")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((error) => console.log("Could not connect to MongoDB...", error));

app.listen(8000, () => console.log("listening om port 8000"));
