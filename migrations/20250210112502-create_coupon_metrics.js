'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('coupon_metrics', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      coupon_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      value: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP()")
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP()")
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('coupon_metrics');
  }
};
