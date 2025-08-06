const DataSiswa = require('../models/DataSiswa');
const LogAbsensi = require('../models/LogAbsensi');

module.exports = {
   index: async (req, res) => {
      try {
         const dataSiswa = await DataSiswa.findAll();
         const dataLogAbsensi = await LogAbsensi.findAll({
            include: {
               model: DataSiswa,
               as: 'siswa'
            },
            order: [
               ['created_at', 'DESC']
            ]
         });

         res.render('pages/log_absensi', {
            layout: 'layouts/main-layout',
            title: 'Log Absensi | SMK KORPRI SUMEDANG',
            currentController: 'log_absensi.index',
            dataLogAbsensi,
            dataSiswa
         });
      } catch (error) {
         res.status(500).send('Terjadi kesalahan saat memuat halaman.');
      }
   },

   create: async (req, res) => {

      try {
         const dataSiswa = await DataSiswa.findAll();
         
         res.render('pages/form_log_absensi', {
            layout: false,
            title: false,
            dataSiswa
         })
      } catch (error) {
         res.status(500).send('Terjadi kesalahan saat memuat halaman.');
      }
   },

   findNISN: async (req, res) => {
      const { nisn } = req.params;

      try {
         const siswa = await DataSiswa.findOne({
            where: {
               nisn
            }
         });
         
         if (!siswa) {
            return res.status(404).json({ message: 'Siswa tidak ditemukan' });
         }

         return res.status(200).json(siswa);
      } catch (error) {
         return res.status(500).send(error);         
      }
   },

   store: async (req, res) => {
      const {
         nisn
      } = req.body;

      try {
         if (!nisn) {
            console.log('NISN gak ada boss');
         } else {
            console.log('NISN ada boss' + ' ' + nisn);
         }
         
         
      } catch (error) {
         
      }
   }
}