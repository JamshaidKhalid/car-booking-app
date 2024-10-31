const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/connectDB");
const User = require("./models/user.model");
const bcrypt = require("bcryptjs");
dotenv.config();

const app = express();
dotenv.config();

connectDB();

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/auth", require("./routes/auth.route"));
app.use("/api/vehicle", require("./routes/vehicle.route"));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
