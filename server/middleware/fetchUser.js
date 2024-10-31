const jwt = require("jsonwebtoken");
const jwt_secret = "thisismysecretforjsonwebtoken";

const fetchUser = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ msg: "Not authenticated" }); 
  }

  try {
    const data = jwt.verify(authHeader, jwt_secret);
    req.user = data;
    next(); 
  } catch (error) {
    res.status(401).json({ msg: "Invalid token" }); 
  }
};

module.exports = fetchUser;
