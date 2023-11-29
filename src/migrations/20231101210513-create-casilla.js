'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Casillas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_partida: {
        type: Sequelize.INTEGER,
        references: { model: 'Partidas', key: 'id' },
      },
      id_dueno: {
        type: Sequelize.INTEGER
      },
      color: {
        type: Sequelize.STRING
      },
      valor_produccion: {
        type: Sequelize.INTEGER
      },
      tipo_ficha: {
        type: Sequelize.STRING
      },
      activacion_ficha: {
        type: Sequelize.BOOLEAN
      },
      tropas: {
        type: Sequelize.INTEGER
      },
      q: {
        type: Sequelize.INTEGER
      },
      r: {
        type: Sequelize.INTEGER
      },
      s: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Casillas');
  }
};