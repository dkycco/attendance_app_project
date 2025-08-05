const DataSiswa = require('../models/DataSiswa');
const {validationResult} = require('express-validator');
const dataSiswaValidation = require('../../validators/dataSiswaValidator');

function socketBroadcastExcept(io, excludeSocketId) {
   return {
      emit: (event, data) => {
         for (let [id, socket] of io.sockets.sockets) {
            if (id !== excludeSocketId) {
               socket.emit(event, data);
            }
         }
      }
   };
}

module.exports = {
   index: async (req, res) => {

      try {
         const dataSiswa = await DataSiswa.findAll();

         res.render('pages/data_siswa', {
            layout: 'layouts/main-layout',
            title: 'Data Siswa | SMK KORPRI SUMEDANG',
            currentController: 'data_siswa.index',
            dataSiswa
         });
      } catch (err) {
         res.status(500).send('Terjadi kesalahan saat memuat halaman.');
      }

   },

   create: async (req, res) => {
      const last_data = await DataSiswa.findOne({
         order: [
            ['id_sidik_jari', 'DESC']
         ]
      });

      res.render('pages/form_data_siswa', {
         layout: false,
         title: false,
         id_sidik_jari: (last_data?.id_sidik_jari + 1 || 0),
         is_edit: false
      })
   },

   store: async (req, res) => {
      const io = req.app.get('io');
      const socketId = req.headers['x-socket-id'];

      await Promise.all(dataSiswaValidation.map(validation => validation.run(req)));

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         const message = errors.array()[0].msg;
         return res.status(400).json({
            message,
            type: 'warning'
         });
      }

      try {
         const {
            id_sidik_jari,
            nisn,
            nama_lengkap,
            kelas,
            nama_orangtua_wali,
            no_hp
         } = req.body;

         const created = await DataSiswa.create({
            id_sidik_jari,
            nisn,
            nama_lengkap,
            kelas,
            nama_orangtua_wali,
            no_hp
         });

         if (socketId) {
            io.to(socketId).emit('data-siswa:toast', {
               message: `Data Siswa baru berhasil disimpan!`,
               type: 'success'
            });

            socketBroadcastExcept(io, socketId).emit('data-siswa:toast', {
               message: `Seseorang menambahkan satu data siswa baru!`,
               type: 'warning'
            });

            io.emit('data-siswa:baru', {
               id: created.id,
               id_sidik_jari: created.id_sidik_jari,
               nisn: created.nisn,
               nama_lengkap: created.nama_lengkap,
               kelas: created.kelas,
               nama_orangtua_wali: created.nama_orangtua_wali,
               no_hp: created.no_hp
            });
         }

         res.status(201).json({
            id_sidik_jari: created.id_sidik_jari,
            nisn: created.nisn,
            nama_lengkap: created.nama_lengkap,
            kelas: created.kelas,
            nama_orangtua_wali: created.nama_orangtua_wali,
            no_hp: created.no_hp
         });
      } catch (err) {
         return res.status(400).json({
            message,
            type: 'warning'
         });
      }
   },

   edit: async (req, res) => {
      const {id} = req.params;
      const data_siswa = await DataSiswa.findOne({
         where: {id}
      });

      res.render('pages/form_data_siswa', {
         layout: false,
         title: false,
         is_edit: true,
         data_siswa
      });
   },

   update: async (req, res) => {
      const io = req.app.get('io');
      const { id } = req.params;
      const socketId = req.headers['x-socket-id'];

      await Promise.all(dataSiswaValidation.map(validation => validation.run(req)));

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         const message = errors.array()[0].msg;
         return res.status(400).json({
            message,
            type: 'warning'
         });
      }

      try {
         const {
            id_sidik_jari,
            nisn,
            nama_lengkap,
            kelas,
            nama_orangtua_wali,
            no_hp
         } = req.body;

         const siswa = await DataSiswa.findByPk(id);
         if (!siswa) {
            return res.status(400).json({
               message: 'Data siswa tidak ditemukan!',
               type: 'danger'
            });
         }

         await siswa.update({
            id_sidik_jari,
            nisn,
            nama_lengkap,
            kelas,
            nama_orangtua_wali,
            no_hp
         });

         if (socketId) {
            io.to(socketId).emit('data-siswa:toast', {
               message: `Data Siswa berhasil diperbarui!`,
               type: 'success'
            });

            socketBroadcastExcept(io, socketId).emit('data-siswa:toast', {
               message: `Seseorang merubah salah satu data siswa!`,
               type: 'warning'
            });

            io.emit('data-siswa:ubah', {
               id: siswa.id,
               id_sidik_jari: siswa.id_sidik_jari,
               nisn: siswa.nisn,
               nama_lengkap: siswa.nama_lengkap,
               kelas: siswa.kelas,
               nama_orangtua_wali: siswa.nama_orangtua_wali,
               no_hp: siswa.no_hp
            });
         }

         res.status(200).json({
            id_sidik_jari: siswa.id_sidik_jari,
            nisn: siswa.nisn,
            nama_lengkap: siswa.nama_lengkap,
            kelas: siswa.kelas,
            nama_orangtua_wali: siswa.nama_orangtua_wali,
            no_hp: siswa.no_hp
         });
      } catch (error) {
         return res.status(400).json({
            message,
            type: 'warning'
         });
      }
   },

   destroy: async (req, res) => {
      const {id} = req.params;
      const io = req.app.get('io');
      const socketId = req.headers['x-socket-id'];

      try {
         await DataSiswa.destroy({
            where: {
               id
            }
         });

         if (socketId) {
            io.to(socketId).emit('data-siswa:toast', {
               message: `Data siswa berhasil dihapus!`,
               type: 'success'
            });

            socketBroadcastExcept(io, socketId).emit('data-siswa:toast', {
               message: `Seseorang menghapus salah satu data siswa!`,
               type: 'warning'
            });

            socketBroadcastExcept(io, socketId).emit('data-siswa:broadcast-hapus', {
               id: id
            });

         }

         return res.status(200).send('Data siswa berhasil dihapus!');
      } catch (error) {
         return res.status(400).send(error);
      }
   }
}