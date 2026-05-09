const express = require('express');
const router = express.Router();
const laporanController = require('../controllers/laporanController');
const { validateLaporan } = require('../middleware/validation');

router.get('/', laporanController.getAll);
router.get('/:id', laporanController.getById);
router.post('/', validateLaporan, laporanController.create);
router.put('/:id', validateLaporan, laporanController.update);
router.delete('/:id', laporanController.delete);

module.exports = router;
