'use strict';

module.exports = {
   up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('api_key', {
         id: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
         },
         dibuat_oleh: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
               model: 'users',
               key: 'id'
            }
         },
         api_key: {
            type: Sequelize.STRING(100),
            allowNull: false,
            unique: true
         },
         status: {
            type: Sequelize.ENUM('active', 'disable'),
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
      await queryInterface.dropTable('api_key');
   }
};