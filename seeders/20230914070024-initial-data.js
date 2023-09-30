"use strict";
const restaurants = require("../public/jsons/restaurant.json").results;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Restaurants",
      Object.values(restaurants).map((item) => ({
        name: item.name,
        name_en: item.name_en,
        category: item.category,
        image: item.image,
        location: item.location,
        phone: item.phone,
        google_map: item.google_map,
        rating: item.rating,
        userId: item.userId,
        description: item.description,
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Restaurants", null);
  },
};
