'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cargos extends Model {
    static associate(models) {
        Cargos.hasOne(models.users, {
          foreignKey: 'id',
          as: 'WarehouseId',
          onDelete: 'CASCADE',
        });
      }
  }
  Cargos.init(
    {
      name: DataTypes.STRING,
      quantity: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
      notes: DataTypes.STRING,
      warehouseId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'cargos',
    },
  );

  return Cargos;
};
