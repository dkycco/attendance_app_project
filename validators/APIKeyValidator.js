const { body } = require('express-validator');

module.exports = [
   body('keterangan').notEmpty().withMessage('Keterangan wajib diisi.')
];