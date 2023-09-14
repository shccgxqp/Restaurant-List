const express = require("express");
const methodOverride = require("method-override");
const app = express();
const { Op } = require("sequelize");

const { engine } = require("express-handlebars");

const port = 3000;

const db = require("./models");
const Restaurant = db.Restaurant;

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
  let name = "%A%";

  return Restaurant.findAll({ raw: true, where: { name: { [Op.substring]: keyword } } }).then((item) => res.render("index", { restaurants: item, keyword }));
});

app.get("/restaurant/:id", (req, res) => {
  const id = req.params.id;
  const restaurant = restaurants.find((rs) => rs.id.toString() === id);
  res.render("detail", { restaurant });
});

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`);
});
