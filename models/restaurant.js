'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Restaurant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  Restaurant.init(
    {
      name: DataTypes.STRING,
      name_en: DataTypes.STRING,
      category: DataTypes.STRING,
      image: DataTypes.STRING,
      location: DataTypes.STRING,
      phone: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      google_map: DataTypes.STRING,
      rating: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Restaurant',
      tableName: 'Restaurants'
    }
  );
  return Restaurant;
};
