const logger = (req, res, next) => {
  console.log("A logger middleware");
  next();
};

module.exports = logger;
