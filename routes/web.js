const express = require('express');
const router = express.Router();

const DataSiswaController = require('../app/controllers/DataSiswaController');
const LogAbsensiController = require('../app/controllers/LogAbsensiController');
const LoginController = require('../app/controllers/LoginController')

const { ensureAuthenticated, authorizeRoles } = require('../middleware/authMiddleware');

router.get('/login', LoginController.index);
router.post('/login', LoginController.login);
router.get('/logout', LoginController.logout);

router.use(ensureAuthenticated);

router.get('/data-siswa', DataSiswaController.index);
router.get('/data-siswa/create', DataSiswaController.create);
router.post('/data-siswa/', DataSiswaController.store);
router.get('/data-siswa/edit/:id', DataSiswaController.edit);
router.post('/data-siswa/update/:id', DataSiswaController.update);
router.delete('/data-siswa/:id', DataSiswaController.destroy);

router.get('/log-absensi', LogAbsensiController.index);
router.get('/log-absensi/create', LogAbsensiController.create);
router.post('/log-absensi/', LogAbsensiController.store);
router.get('/log-absensi/cari-nisn/:nisn', LogAbsensiController.findNISN);
router.get('/log-absensi/lihat-data/:id', LogAbsensiController.viewData);

module.exports = router;