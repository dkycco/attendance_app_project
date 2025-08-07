const { body } = require('express-validator');

module.exports = [
   body('username').notEmpty().withMessage('Username wajib diisi.'),
   body('password').notEmpty().withMessage('Password wajib diisi.')
];