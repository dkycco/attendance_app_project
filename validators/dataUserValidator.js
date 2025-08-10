const { body } = require('express-validator');

module.exports = [
  body('nama_lengkap')
    .notEmpty().withMessage('Nama lengkap wajib diisi!'),

  body('username')
    .notEmpty().withMessage('Username wajib diisi!'),

  body('password')
    .notEmpty().withMessage('Password wajib diisi!'),

  body('konfirmasi_pass')
    .notEmpty().withMessage('Konfirmasi password wajib diisi!'),

  body('role')
    .notEmpty().withMessage('Role pengguna wajib dipilih!')
];
