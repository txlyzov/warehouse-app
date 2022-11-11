'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Warehouses extends Model {
    static associate(models) {
        Warehouses.hasOne(models.users, {
          foreignKey: 'id',
          as: 'OwnerId',
          onDelete: 'CASCADE',
        });
      }
  }
  Warehouses.init(
    {
      name: DataTypes.STRING,
      location: DataTypes.STRING,
      ownerId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'warehouses',
    },
  );

  return Warehouses;
};
