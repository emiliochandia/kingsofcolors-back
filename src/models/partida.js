'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Partida extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Jugador, {
        foreignKey: 'id',
      });
      this.hasMany(models.Casilla, {
        foreignKey: 'id',
      });
    }
  }
  Partida.init({
    admin_partida: DataTypes.INTEGER,
    fase: DataTypes.STRING,
    ganador: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Partida',
  });
  return Partida;
};