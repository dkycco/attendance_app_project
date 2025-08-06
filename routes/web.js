const express = require('express');
const router = express.Router();
const DataSiswaController = require('../app/controllers/DataSiswaController');
const LogAbsensiController = require('../app/controllers/LogAbsensiController');

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

module.exports = router;