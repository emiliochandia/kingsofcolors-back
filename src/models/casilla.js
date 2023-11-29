'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Casilla extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Partida, {
        foreignKey: 'id_partida',
      });
    }
  }
  Casilla.init({
    id_partida: DataTypes.INTEGER,
    id_dueno: DataTypes.INTEGER,
    color: DataTypes.STRING,
    valor_produccion: DataTypes.INTEGER,
    tipo_ficha: DataTypes.STRING,
    activacion_ficha: DataTypes.BOOLEAN,
    tropas: DataTypes.INTEGER,
    q: DataTypes.INTEGER,
    r: DataTypes.INTEGER,
    s: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Casilla',
  });
  return Casilla;
};