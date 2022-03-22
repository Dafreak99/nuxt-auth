const express = require("express");
const { default: mongoose } = require("mongoose");
const { db } = require("./models/User");
const User = require("./models/User");
const app = express();
const port = 5000;
const jwt = require("jsonwebtoken");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const { createAccessToken, createRefreshToken } = require("./utils/token");
const authMiddleware = require("./utils/authMiddleware");

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

mongoose
  .connect(
    "mongodb+srv://haitran99:programmer2211@cluster0.xpopo.mongodb.net/authentication?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then("MongoDB connected");


app.get('/heathcheck', (req,res)=>{
  res.send('ok');
})

app.post("/api/auth/register", async (req, res) => {
  const { email, username, password } = req.body;

  let user = new User({ email, username, password });

  await user.save();

  res.send({
    message: "Created a new account successfully",
  });
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  let user = await User.findOne({ email });

  if (!user) {
    return res.status(403).send({
      error: "Invalid credential!",
    });
  }

  try {
    let isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(403).send({
        error: "Invalid credential!",
      });
    }

    const token = createAccessToken(user);
    const refreshToken = createRefreshToken(user);

    res.send({ token, refreshToken, user });
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/auth/user", authMiddleware, (req, res) => {
  return res.send({ user: req.user });
});

app.post("/api/auth/refreshToken", async (req, res) => {
  // 1. Read the refresh token from cookie
  const token = req.cookies.refreshToken;
  // 2. Make sure the token is available

  if (!token) {
    return res.status(401).send({ message: "Unauthenticated" });
  }

  // 3. Make sure the token is valid
  // This also throw error if the token is expired
  let payload = null;
  try {
    payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (error) {
    return res.status(401).send({ message: "Unauthenticated" });
  }

  // 4. Get the user from payload in order to generate new access token
  const user = await User.findById(payload.userId);

  res.status(200).send({
    accessToken: createAccessToken(user),
    refreshToken: createRefreshToken(user),
  });
});

app.get("/api/auth/private", authMiddleware, (req, res) => {
  res.send("Ok");
});

app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`);
});
