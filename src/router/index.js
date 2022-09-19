const user = require("./user/user");
const auth = require("./auth/auth")
const data = require ("./data/data")

const routes = (app) => {
  app.use("/api", user);
  app.use("/api", auth);
  app.use("/api", data);
};

module.exports = routes;
