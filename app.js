//express
const express = require("express");
const app = express();
const { engine } = require("express-handlebars");
const port = 3000;

//sequelize
const db = require("./models");
const Restaurant = db.Restaurant;
const { Op } = require("sequelize"); //sequelize Operators

//method-override put & deleat
const methodOverride = require("method-override");

//init
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.redirect("/restaurants");
});

app.get("/restaurants", (req, res) => {
  const keyword = req.query.keyword?.trim();
  return Restaurant.findAll({ raw: true, where: { name: { [Op.substring]: keyword ? keyword : "" } } }).then((item) => res.render("index", { restaurants: item, keyword }));
});

app.get("/restaurant/:id", (req, res) => {
  const id = req.params.id;
  return Restaurant.findByPk(id, { raw: true }).then((item) => res.render("detail", { restaurant: item }));
});

app.get("/restaurant/:id/edit", (req, res) => {
  return res.send("edit");
});

app.get("/restaurant/:id/new", (req, res) => {
  return res.send("new");
});

app.post("/restaurant/", (req, res) => {
  return res.send("post id");
});

app.put("/restaurant/:id", (req, res) => {
  return res.send("put id");
});

app.delete("/restaurant/:id", (req, res) => {
  return res.send("delete");
});

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`);
});
