const express = require('express');
const router = express.Router();

const DashboardController = require('../app/controllers/DashboardController');
const DataSiswaController = require('../app/controllers/DataSiswaController');
const LogAbsensiController = require('../app/controllers/LogAbsensiController');
const LoginController = require('../app/controllers/LoginController')

const { ensureAuthenticated, authorizeRoles } = require('../middleware/authMiddleware');
const UsersController = require('../app/controllers/UsersController');

router.get('/login', LoginController.index);
router.post('/login', LoginController.login);
router.get('/logout', LoginController.logout);

router.use(ensureAuthenticated);

router.get('/dashboard', authorizeRoles('webmaster', 'admin', 'guru'), DashboardController.index);

router.get('/pengguna', authorizeRoles('webmaster'), UsersController.index);
router.get('/pengguna/create', authorizeRoles('webmaster'), UsersController.create);
router.post('/pengguna/', authorizeRoles('webmaster'), UsersController.store);
router.get('/pengguna/edit/:id', authorizeRoles('webmaster'), UsersController.edit);
router.post('/pengguna/update/:id', authorizeRoles('webmaster'), UsersController.update);

router.get('/data-siswa', authorizeRoles('webmaster', 'admin'), DataSiswaController.index);
router.get('/data-siswa/create', authorizeRoles('webmaster', 'admin'), DataSiswaController.create);
router.post('/data-siswa/', authorizeRoles('webmaster', 'admin'), DataSiswaController.store);
router.get('/data-siswa/edit/:id', authorizeRoles('webmaster', 'admin'), DataSiswaController.edit);
router.post('/data-siswa/update/:id', authorizeRoles('webmaster', 'admin'), DataSiswaController.update);
router.delete('/data-siswa/:id', authorizeRoles('webmaster', 'admin'), DataSiswaController.destroy);

router.get('/log-absensi', authorizeRoles('webmaster', 'admin', 'guru'), LogAbsensiController.index);
router.get('/log-absensi/create', authorizeRoles('webmaster', 'admin', 'guru'), LogAbsensiController.create);
router.post('/log-absensi/', authorizeRoles('webmaster', 'admin', 'guru'), LogAbsensiController.store);
router.get('/log-absensi/cari-nisn/:nisn', authorizeRoles('webmaster', 'admin', 'guru'), LogAbsensiController.findNISN);
router.get('/log-absensi/lihat-data/:id', authorizeRoles('webmaster', 'admin', 'guru'), LogAbsensiController.viewData);

module.exports = router;