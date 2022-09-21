require("express-async-errors");
const dotenv = require("dotenv");

function initconfig() {
  dotenv.config();

  if (!process.env.JWT_SECRET) {
    console.log("jwt secret is not set");
    process.exit(1);
  }
}

module.exports = initconfig;
