const express = require("express");
const { connectionDB } = require("./db/config");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./src/router/index");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
dotenv.config();

const PORT = process.env.PORT || 4000;

connectionDB();

routes(app);

app.listen(4000, () => {
  console.log(`Server on Port ${PORT}`);
});
