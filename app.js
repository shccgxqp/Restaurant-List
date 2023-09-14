const express = require("express");
const methodOverride = require("method-override");
const app = express();

const db = require("./models");
const Restaurant = db.restaurant;

const port = 3000;
const restaurants = require("./public/jsons/restaurant.json").results;

const { engine } = require("express-handlebars");

app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.redirect("/restaurants");
});

app.get("/restaurants", (req, res) => {
  const keyword = req.query.keyword?.trim();
  const matchedRestaurants = keyword
    ? restaurants.filter((rs) =>
        Object.values(rs).some((property) => {
          if (typeof property === "string") {
            return property.toLowerCase().includes(keyword.toLowerCase());
          }
          return false;
        })
      )
    : restaurants;
  res.render("index", { restaurants: matchedRestaurants, keyword });
});
app.get("/restaurant/:id", (req, res) => {
  const id = req.params.id;
  const restaurant = restaurants.find((rs) => rs.id.toString() === id);
  res.render("detail", { restaurant });
});

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`);
});
