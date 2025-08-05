'use strict';

module.exports = {
   up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('users', {
         id: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
         },
         name: {
            type: Sequelize.STRING(100),
            allowNull: false
         },
         email: {
            type: Sequelize.STRING(100),
            allowNull: false,
            unique: true
         },
         password: {
            type: Sequelize.STRING,
            allowNull: false
         },
         created_at: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
         },
         updated_at: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
         }
      });
   },

   down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('users');
   }
};