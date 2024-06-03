const express = require("express");
const userRoutes = require("./routes/userRoutes");
const metaRoutes = require("./routes/metaRoutes");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const app = express();
require("./config");

app.use(express.urlencoded({ extended: false }));

const jwt = require("jsonwebtoken");

app.use(userRoutes);
app.use(metaRoutes);

app.use(cookieParser());

app.set("view engine", "ejs");

function authenticateToken(req, res, next) {
  // const authHeader = req.headers["authorization"];
  // const token = authHeader && authHeader.split(" ")[1];

  const token = req.cookies.accessToken;

  if (token == null) return res.redirect("login");

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.redirect("login");
    req.user = user;
    next();
  });
}

app.get("/", authenticateToken, (req, res) => {
  res.render("novameta");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.get("/login", (req, res) => {
  const error = req.query.error ? req.query.error : null;
  res.render("login", { error: error });
});

app.get("/novameta", authenticateToken, (req, res) => {
  res.render("novameta");
});

app.post("/logout", (req, res) => {
  res.clearCookie("accessToken");
  res.redirect("/login");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
