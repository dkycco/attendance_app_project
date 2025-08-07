const { body } = require('express-validator');

module.exports = [
  body('id_sidik_jari')
    .notEmpty().withMessage('ID sidik jari wajib diisi!'),

  body('nisn')
    .notEmpty().withMessage('NISN wajib diisi1')
    .isLength({ min: 10, max: 10 }).withMessage('NISN harus terdiri dari 10 digit angka!')
    .isNumeric().withMessage('NISN harus berupa angka!'),

  body('nama_lengkap')
    .notEmpty().withMessage('Nama lengkap wajib diisi!'),

  body('kelas')
    .notEmpty().withMessage('Kelas wajib diisi!'),

  body('nama_orangtua_wali')
    .notEmpty().withMessage('Nama orang tua/wali wajib diisi!'),

  body('no_hp')
    .notEmpty().withMessage('Nomor HP wajib diisi!')
    .isLength({ min: 10, max: 17 }).withMessage('Nomor HP tidak valid!')
];
