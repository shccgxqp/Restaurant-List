//express
const express = require("express");
const app = express();
const { engine } = require("express-handlebars");
const port = 3000;

//sequelize
const db = require("./models");
const Restaurant = db.Restaurant;
const { Op } = require("sequelize"); //sequelize Operators

//method-override -> put & deleat
const methodOverride = require("method-override");

//init
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride("_method"));

//ok
app.get("/", (req, res) => {
  res.redirect("/restaurants");
});

//ok
app.get("/restaurants", (req, res) => {
  const keyword = req.query.keyword?.trim();
  return Restaurant.findAll({
    raw: true,
    where: { name: { [Op.substring]: keyword ? keyword : "" } },
  }).then((item) => res.render("index", { restaurants: item, keyword }));
});

app.get("/restaurant/new", (req, res) => {
  return res.render("new");
});

//ok
app.get("/restaurant/:id", (req, res) => {
  const id = req.params.id;
  return Restaurant.findByPk(id, { raw: true }).then((item) =>
    res.render("detail", { restaurant: item })
  );
});

//ok
app.get("/restaurant/:id/edit", (req, res) => {
  const id = req.params.id;
  return Restaurant.findByPk(id, { raw: true }).then((item) =>
    res.render("edit", { restaurant: item })
  );
});

app.post("/restaurant/", (req, res) => {
  const body = req.body;
  return Restaurant.create({
    name: body.name,
    name_en: body.name_en,
    category: body.category,
    image: body.image,
    location: body.location,
    phone: body.phone,
    google_map: body.google_map,
    rating: body.rating,
    description: body.description,
  }).then(() => res.redirect("/restaurants"));
});

//ok
app.put("/restaurant/:id", (req, res) => {
  const body = req.body;
  const id = req.params.id;

  return Restaurant.update(
    {
      name: body.name,
      name_en: body.name_en,
      category: body.category,
      image: body.image,
      location: body.location,
      phone: body.phone,
      google_map: body.google_map,
      rating: body.rating,
      description: body.description,
    },
    { where: { id } }
  ).then(() => res.redirect(`/restaurant/${id}`));
});

//ok
app.delete("/restaurant/:id", (req, res) => {
  const id = req.params.id;
  return Restaurant.destroy({ where: { id } }).then(() => res.redirect("/restaurants"));
});

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`);
});
