'use strict';

module.exports = {
   up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('log_absensi', {
         id: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
         },
         nisn: {
            type: Sequelize.STRING(10),
            allowNull: false,
            references: {
               model: 'data_siswa',
               key: 'nisn'
            }
         },
         status_siswa: {
            type: Sequelize.ENUM('hadir', 'pulang'),
            allowNull: false
         },
         status_pesan: {
            type: Sequelize.ENUM('pending', 'terkirim', 'gagal'),
            allowNull: false,
            defaultValue: 'pending'
         },
         pesan: {
            type: Sequelize.TEXT(),
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
      await queryInterface.dropTable('log_absensi');
   }
};