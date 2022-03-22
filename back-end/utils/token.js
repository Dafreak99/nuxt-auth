const { sign } = require("jsonwebtoken");

const createAccessToken = (user) => {
  return sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15s",
  });
};

const createRefreshToken = (user) => {
  return sign(
    { userId: user.id, tokenVersion: user.tokenVersion },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  );
};

module.exports = {
  createAccessToken,
  createRefreshToken,
};
