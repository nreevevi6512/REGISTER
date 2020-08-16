const express = require("express");
const app = express();
const bcrypt = require("bcrypt");

const users = [];

app.set("view-engine", "ejs");
app.use(express.urlencoded({ extended: false }));

//route
app.get("/", (req, res) => {
  res.render("index.ejs", { name: "EUT" });
});

//LOGIN

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

//REGISTER
app.get("/register", (req, res) => {
  res.render("register.ejs");
});
app.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    users.push({
      id: Date.now(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    res.redirect("/login");
  } catch {
    res.redirect("/register");
  }
  console.log(users);
});

app.listen(3100, function () {
  console.log("Connected to Server");
});
