//  express
const express = require('express');
const router = express.Router();

//  sequelize
const db = require('../models');
const Restaurant = db.Restaurant;
const { Op } = require('sequelize'); // sequelize Operators

router.get('/', (req, res, next) => {
  const keyword = req.query.keyword?.trim();
  const page = parseInt(req.query.page) || 1;
  const limit = 8;

  return Restaurant.findAll({
    offset: (page - 1) * limit, limit,
    raw: true,
    where: { name: { [Op.substring]: keyword ? keyword : '' } },
  }).then((item) => res.render('index', {
    restaurants: item, keyword,
    prev: page - 1,
    next: page + 1,
    page,
  }))
    .catch((error) => {
      error.errorMessage = '資料讀取失敗'
      next(error)
    });
});

router.get('/new', (req, res) => {
  return res.render('new');
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  return Restaurant.findByPk(id, { raw: true }).then((item) =>
    res.render('detail', { restaurant: item })
  ).catch((error) => {
    error.errorMessage = '資料讀取失敗'
    next(error)
  });
});

router.get('/:id/edit', (req, res, next) => {
  const id = req.params.id;
  return Restaurant.findByPk(id, { raw: true }).then((item) =>
    res.render('edit', { restaurant: item })
  ).catch((error) => {
    error.errorMessage = '資料讀取失敗'
    next(error)
  });
});

router.post('/', (req, res, next) => {
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
  }).then(() => {
    req.flash('success', '新增成功')
    return res.redirect('/restaurant')
  }).catch((error) => {
    error.errorMessage = '新增失敗';
    next(error)
  });
});

router.put('/:id', (req, res, next) => {
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
  ).then(() => {
    req.flash('success', '修改成功')
    return res.redirect(`/restaurant/${id}`)
  })
    .catch((error) => {
      error.errorMessage = '修改失敗';
      next(error)
    });
});

router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  return Restaurant.destroy({ where: { id } }).then(() => {
    req.flash('success', '刪除成功')
    return res.redirect('/restaurant')
  }).catch((error) => {
    error.errorMessage = '刪除失敗'
    next(error)
  });
});

module.exports = router;
