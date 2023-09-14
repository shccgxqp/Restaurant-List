const express = require("express");
const methodOverride = require("method-override");
const app = express();

const { engine } = require("express-handlebars");

const port = 3000;

const db = require("./models");
const Restaurant = db.Restaurant;

app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");

app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.redirect("/restaurants");
});

app.get("/restaurants", (req, res) => {
  return Restaurant.findAll({}).then((item) => res.send(item));
  // const keyword = req.query.keyword?.trim();
  // {
  //   where: keyword ? keyword : null;
  // }
  // const matchedRestaurants = keyword
  //   ? restaurants.filter((rs) =>
  //       Object.values(rs).some((property) => {
  //         if (typeof property === "string") {
  //           return property.toLowerCase().includes(keyword.toLowerCase());
  //         }
  //         return false;
  //       })
  //     )
  //   : restaurants;
  // res.render("index", { restaurants: matchedRestaurants, keyword });
});

// app.get("/restaurant/:id", (req, res) => {
//   const id = req.params.id;
//   const restaurant = restaurants.find((rs) => rs.id.toString() === id);
//   res.render("detail", { restaurant });
// });

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`);
});
