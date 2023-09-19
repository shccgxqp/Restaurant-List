//  express
const express = require('express');
const router = express.Router();

//  sequelize
const db = require('../models');
const Restaurant = db.Restaurant;
const { Op } = require('sequelize'); // sequelize Operators

router.get('/', (req, res) => {
  const keyword = req.query.keyword?.trim();
  return Restaurant.findAll({
    raw: true,
    where: { name: { [Op.substring]: keyword ? keyword : '' } },
  }).then((item) => res.render('index', { restaurants: item, keyword }));
});

router.get('/new', (req, res) => {
  return res.render('new');
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  return Restaurant.findByPk(id, { raw: true }).then((item) =>
    res.render('detail', { restaurant: item })
  );
});

router.get('/:id/edit', (req, res) => {
  const id = req.params.id;
  return Restaurant.findByPk(id, { raw: true }).then((item) =>
    res.render('edit', { restaurant: item })
  );
});

router.post('/', (req, res) => {
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
  }).then(() => res.redirect('/restaurant'));
});

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  return Restaurant.destroy({ where: { id } }).then(() => res.redirect('/restaurant'));
});

module.exports = router;
