const User = require('../models/user');
const {validationResult} = require('express-validator');
const loginValidation = require('../../validators/loginValidator');
const { index } = require('./DataSiswaController');
const bcrypt = require('bcryptjs');

module.exports = {
   index: async (req, res) => {
      res.render('auth/login', {
         layout: 'layouts/auth-layout',
         title: 'Login | SMK KORPRI SUMEDANG',
         controller: 'login.index',
      });
   },

   login: async (req, res) => {
      const { username, password } = req.body;
      await Promise.all(loginValidation.map(validation => validation.run(req)));

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         const message = errors.array()[0].msg;
         return res.status(400).json({
            message,
            type: 'warning'
         });
      }

      try {
         const user = await User.findOne({ where: { username } });

         if (!user) {
            return res.status(400).json({
               message: 'Username tidak ditemukan!',
               type: 'warning'
            });
         }

         const passwordMatch = await bcrypt.compare(password, user.password);

         if (!passwordMatch) {
            return res.status(400).json({
               message: 'Password salah!',
               type: 'warning'
            });
         }

         req.session.user = {
            id: user.id,
            nama_lengkap: user.nama_lengkap,
            username: user.username,
            role: user.role
         };

         res.status(201).json({
            message: 'Login berhasil!',
            type: 'success'
         });
      } catch (err) {
         console.error(err);
         res.status(500).send('Terjadi kesalahan server');
      }
   },

   logout: (req, res) => {
      req.session.destroy((err) => {
         if (err) {
            return res.status(500).send('Gagal logout');
         }
         res.redirect('/login');
      });
   }
}