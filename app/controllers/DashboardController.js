const DataSiswa = require('../models/DataSiswa');
const LogAbsensi = require('../models/LogAbsensi');
const { Op } = require('sequelize');

const today = new Date().toISOString().split('T')[0];

module.exports = {
   index: async (req, res) => {
      try {
         const dataSiswa = await DataSiswa.findAll();
         const logAbsensi = await LogAbsensi.findAll();
         const totalTepatWaktu = await LogAbsensi.count({
            where: {
               created_at: {
                  [Op.between]: [
                     new Date(`${today}T06:30:00+07:00`),
                     new Date(`${today}T06:40:00+07:00`)
                  ]
               }
            }
         });

         const totalTelat = await LogAbsensi.count({
            where: {
               created_at: {
                  [Op.gte]: new Date(`${today}T06:40:00+07:00`)
               }
            }
         });

         res.render('pages/dashboard', {
            layout: 'layouts/main-layout',
            title: 'Dashboard | SMK KORPRI SUMEDANG',
            controller: 'dashboard.index',
            totalTepatWaktu,
            totalTelat

         });
      } catch (err) {
         res.status(500).send('Terjadi kesalahan saat memuat halaman.');
      }
   }
}