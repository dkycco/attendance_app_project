const { body } = require('express-validator');

module.exports = [
  body('nama_lengkap')
    .notEmpty().withMessage('Nama lengkap wajib diisi!'),

  body('username')
    .notEmpty().withMessage('Username wajib diisi!'),

  body('role')
    .notEmpty().withMessage('Role pengguna wajib dipilih!')
];
