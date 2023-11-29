'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Jugador extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Usuario, {
        foreignKey: 'id_usuario',
      });
      this.belongsTo(models.Partida, {
        foreignKey: 'id_partida',
      });
    }
  }
  Jugador.init({
    id_usuario: DataTypes.INTEGER,
    color: DataTypes.STRING,
    tropas: DataTypes.INTEGER,
    producción_total: DataTypes.INTEGER,
    id_partida: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Jugador',
  });
  return Jugador;
};