'use strict';

module.exports = {
   up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('data_siswa', {
         id: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
         },
         id_sidik_jari: {
            type: Sequelize.INTEGER(10),
            allowNull: false,
            unique: true
         },
         nisn: {
            type: Sequelize.STRING(10),
            allowNull: false,
            unique: true
         },
         nama_lengkap: {
            type: Sequelize.STRING(100),
            allowNull: false
         },
         kelas: {
            type: Sequelize.STRING(15),
            allowNull: false
         },
         nama_orangtua_wali: {
            type: Sequelize.STRING(100),
            allowNull: false
         },
         no_hp: {
            type: Sequelize.STRING(17),
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
      await queryInterface.dropTable('data_siswa');
   }
};