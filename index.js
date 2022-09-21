const express = require("express");
const startup = require("./startup");
const app = express();

startup(app);

app.listen(8000, () => console.log("listening om port 8000"));
