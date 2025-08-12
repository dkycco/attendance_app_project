const DataSiswa = require('../models/DataSiswa');
const LogAbsensi = require('../models/LogAbsensi');

module.exports = {
   index: async (req, res) => {
      try {
         const dataSiswa = await DataSiswa.findAll();
         const logAbsensi = await LogAbsensi.findAll();

         res.render('pages/dashboard', {
            layout: 'layouts/main-layout',
            title: 'Dashboard | SMK KORPRI SUMEDANG',
            controller: 'dashboard.index',
         });
      } catch (err) {
         res.status(500).send('Terjadi kesalahan saat memuat halaman.');
      }
   }
}