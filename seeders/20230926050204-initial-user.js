'use strict';

const bcrypt = require('bcryptjs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const hash = await bcrypt.hash('12345678', 10)
    await queryInterface.bulkInsert("users", [
      {
        name: 'user1',
        email: 'user1@example.com',
        password: hash,
        favorite: '1 2 3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'user2',
        email: 'user2@example.com',
        password: hash,
        favorite: '4 5 6',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null);
  }
};
