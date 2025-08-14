const User = require("../models/user");
const {validationResult} = require('express-validator');
const dataUserValidator = require('../../validators/dataUserValidator');
const dataUserWoPassValidator = require('../../validators/dataUserWoPassValidator');
const bcrypt = require('bcryptjs');

module.exports = {
   index: async (req, res) => {
      const dataUser = await User.findAll();
      try {
         res.render('pages/users', {
            layout: 'layouts/main-layout',
            title: 'Pengguna | SMK KORPRI SUMEDANG',
            controller: 'users.index',
            dataUser
         });
      } catch (err) {
         res.status(500).send('Terjadi kesalahan saat memuat halaman.');
      }
   },

   create: async (req, res) => {
      res.render('pages/form_users', {
         layout: false,
         title: false,
         currentController: 'users.index',
         is_create: true,
      });
   },

   store: async (req, res) => {
      const io = req.app.get('io');
      const socketId = req.headers['x-socket-id'];
      const {
         nama_lengkap,
         username,
         password,
         konfirmasi_pass,
         role
      } = req.body;

      await Promise.all(dataUserValidator.map(validation => validation.run(req)));

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         const message = errors.array()[0].msg;
         return res.status(400).json({
            message,
            type: 'warning'
         });
      }

      if ((password || '') !== (konfirmasi_pass || '')) {
         return res.status(400).json({
            message: 'Password dan konfirmasi password harus sama!',
            type: 'warning'
         });
      }
      

      try {
         const hashPassword = await bcrypt.hash(password, 10);

         const created = await User.create({
            nama_lengkap,
            username,
            password: hashPassword,
            role
         });

         if (socketId) {
            io.to(socketId).emit('push:toast', {
               message: `Data Pengguna baru berhasil disimpan!`,
               type: 'success'
            });

            io.emit('data-pengguna:baru', {
               id: created.id,
               nama_lengkap: created.nama_lengkap,
               username: created.username,
               role: created.role
            });
         }

         res.status(200).json({ created });
      } catch (error) {
         return res.status(400).json({
            message: 'Gagal menyimpan data pengguna!',
            type: 'warning'
         });
      }
   },

   edit: async (req, res) => {
      const {id} = req.params;
      const data = await User.findOne({
         where: {id}
      });

      res.render('pages/form_users', {
         layout: false,
         title: false,
         is_create: false,
         data
      });
   },

   update: async (req, res) => {
      const io = req.app.get('io');
      const { id } = req.params;
      const socketId = req.headers['x-socket-id'];
      const {
         nama_lengkap,
         username,
         password,
         konfirmasi_pass,
         role
      } = req.body;

      await Promise.all(dataUserWoPassValidator.map(validation => validation.run(req)));

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         const message = errors.array()[0].msg;
         return res.status(400).json({
            message,
            type: 'warning'
         });
      }

      if ((password || '') !== (konfirmasi_pass || '')) {
         return res.status(400).json({
            message: 'Password dan konfirmasi password harus sama!',
            type: 'warning'
         });
      }

      try {
         const user = await User.findByPk(id);
         if (!user) {
            return res.status(400).json({
               message: 'Data user tidak ditemukan!',
               type: 'danger'
            });
         }

         if (password) {
            const hashPassword = await bcrypt.hash(password, 10);

            await user.update({
               nama_lengkap,
               username,
               password: hashPassword,
               role
            });
         } else {
            await user.update({
               nama_lengkap,
               username,
               role
            });
         }

         if (socketId) {
            io.to(socketId).emit('push:toast', {
               message: `Data Pengguna berhasil diperbarui!`,
               type: 'success'
            });

            io.emit('data-pengguna:ubah', {
               id: user.id,
               nama_lengkap: user.nama_lengkap,
               username: user.username,
               role: user.role
            });
         }

         res.status(200).json({ user });
      } catch (error) {
         return res.status(400).json({
            message,
            type: 'warning'
         });
      }
   }
}