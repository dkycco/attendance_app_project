'use strict';

const dayjs = require('dayjs');

module.exports = {
   up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('data_siswa', [{
         id_sidik_jari: '0',
         nisn: '0098765432',
         nama_lengkap: 'Diki Muhamad Alfikri',
         kelas: 'xii_rpl',
         nama_orangtua_wali: 'Nana',
         no_hp: '+62 813-9556-4815',
         created_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
         updated_at: dayjs().format('YYYY-MM-DD HH:mm:ss')
      },{
         id_sidik_jari: '1',
         nisn: '0097586475',
         nama_lengkap: 'Ucup Pirdaus',
         kelas: 'xii_titl',
         nama_orangtua_wali: 'Uju',
         no_hp: '+62 813-9556-4815',
         created_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
         updated_at: dayjs().format('YYYY-MM-DD HH:mm:ss')
      },{
         id_sidik_jari: '2',
         nisn: '0096324567',
         nama_lengkap: 'Asep Arayana',
         kelas: 'x_otomotif',
         nama_orangtua_wali: 'Khasanah',
         no_hp: '+62 813-9556-4815',
         created_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
         updated_at: dayjs().format('YYYY-MM-DD HH:mm:ss')
      },{
         id_sidik_jari: '3',
         nisn: '0097345324',
         nama_lengkap: 'Pira Amelia',
         kelas: 'xi_rpl',
         nama_orangtua_wali: 'Mardi',
         no_hp: '+62 813-9556-4815',
         created_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
         updated_at: dayjs().format('YYYY-MM-DD HH:mm:ss')
      },{
         id_sidik_jari: '4',
         nisn: '0098675432',
         nama_lengkap: 'Muhammad Akmal',
         kelas: 'x_titl',
         nama_orangtua_wali: 'Kanaya',
         no_hp: '+62 813-9556-4815',
         created_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
         updated_at: dayjs().format('YYYY-MM-DD HH:mm:ss')
      }]);
   },

   down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('data_siswa', null, {});
   }
};