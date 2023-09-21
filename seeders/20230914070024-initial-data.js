"use strict";
const restaurants = require("../public/jsons/restaurant.json").results;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "restaurants",
      Object.values(restaurants).map((itme) => ({
        name: itme.name,
        name_en: itme.name_en,
        category: itme.category,
        image: itme.image,
        location: itme.location,
        phone: itme.phone,
        google_map: itme.google_map,
        rating: itme.rating,
        description: itme.description,
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("restaurants", null);
  },
};
