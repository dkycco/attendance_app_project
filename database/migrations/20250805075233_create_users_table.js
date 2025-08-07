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
         nama_lengkap: {
            type: Sequelize.STRING(100),
            allowNull: false
         },
         username: {
            type: Sequelize.STRING(100),
            allowNull: false,
            unique: true
         },
         role: {
            type: Sequelize.ENUM('webmaster', 'admin', 'guru'),
            allowNull: false
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