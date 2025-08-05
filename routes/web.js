const express = require('express');
const router = express.Router();
const DataSiswaController = require('../app/controllers/DataSiswaController');

router.get('/data-siswa', DataSiswaController.index);
router.get('/data-siswa/create', DataSiswaController.create);
router.post('/data-siswa/', DataSiswaController.store);
router.get('/data-siswa/edit/:id', DataSiswaController.edit);
router.post('/data-siswa/update/:id', DataSiswaController.update);
router.delete('/data-siswa/:id', DataSiswaController.destroy);

module.exports = router;