const User = require("../models/user.model");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwt_secret = "thisismysecretforjsonwebtoken";
exports.signin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(422).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(422).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    const data = {
      id: user.id,
    };

    const authToken = jwt.sign(data, jwt_secret);

    res.send({ authToken });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
