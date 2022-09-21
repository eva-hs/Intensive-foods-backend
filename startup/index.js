const initconfig = require("./config");
const initRoutes = require("./routes");
const initDb = require("./db");

function startup(app) {
  initconfig();
  initRoutes(app);
  initDb();
}

module.exports = startup;
