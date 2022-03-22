const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).send({ message: "Unauthenticated" });
  }

  try {
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(payload.userId);

    if (!user) {
      return res.status(401).send({ message: "Unauthenticated" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error.message);
    if (error.message === "jwt expired") {
      res.status(401).send({ message: "Unauthenticated" });
    }
  }
};
