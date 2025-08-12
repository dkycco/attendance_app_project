const express = require('express');
const router = express.Router();

const DashboardController = require('../app/controllers/DashboardController');
const UsersController = require('../app/controllers/UsersController');
const DataSiswaController = require('../app/controllers/DataSiswaController');
const LogAbsensiController = require('../app/controllers/LogAbsensiController');
const LoginController = require('../app/controllers/LoginController');
const whatsappController = require('../app/controllers/whatsappController');
const APIKeyController = require('../app/controllers/APIKeyController');

// const { ensureAuthenticated, authorizeRoles } = require('../middleware/authMiddleware');

router.get('/login', LoginController.index);
router.post('/login', LoginController.login);
router.get('/logout', LoginController.logout);

// router.use(ensureAuthenticated);

router.get('/dashboard', DashboardController.index);

router.get('/pengguna', UsersController.index);
router.get('/pengguna/create', UsersController.create);
router.post('/pengguna/', UsersController.store);
router.get('/pengguna/edit/:id', UsersController.edit);
router.post('/pengguna/update/:id', UsersController.update);

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

router.get('/whatsapp', whatsappController.index);

router.get('/api-key', APIKeyController.index);
router.get('/api-key/create', APIKeyController.create);
router.post('/api-key', APIKeyController.store);

module.exports = router;