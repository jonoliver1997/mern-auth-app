import express from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import User from "./models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const secret = "secret123";

await mongoose.connect("mongodb://localhost:27017/auth", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/user", (req, res) => {
  const payload = jwt.verify(req.cookies.token, secret);
  User.findById(payload.id).then((userInfo) => {
    res.json({ id: userInfo._id, email: userInfo.email });
  });
});

app.post("/register", (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const user = new User({ email, password: hashedPassword });
  user.save().then((userInfo) => {
    jwt.sign(
      { id: userInfo._id, email: userInfo.email },
      secret,
      (err, token) => {
        if (err) {
          console.error(err);
          res.sendStatus(500);
        } else {
          res
            .cookie("token", token)
            .json({ id: userInfo._id, email: userInfo.email });
        }
      }
    );
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.find({ email }).then((userInfo) => {
    const passwordMatch = bcrypt.compareSync(password, userInfo[0].password);
    if (passwordMatch) {
      jwt.sign(
        { id: userInfo._id, email: userInfo.email },
        secret,
        (err, token) => {
          if (err) {
            console.error(err);
            res.sendStatus(500);
          } else {
            res
              .cookie("token", token)
              .json({ id: userInfo._id, email: userInfo.email });
          }
        }
      );
    }
  });
});

app.post("/logout", (req, res) => {
  res.clearCookie("token").sendStatus(200);
});

app.listen(3500, () => {});
