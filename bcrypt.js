const bcrypt = require("bcrypt");

async function run() {
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash("12345", salt);
  console.log(hash);
}

run();
