const express = require('express');
const router = express.Router();
const pelangganController = require('../controllers/pelangganController');
const { validatePelanggan } = require('../middleware/validation');

router.get('/', pelangganController.getAll);
router.get('/:id', pelangganController.getById);
router.post('/', validatePelanggan, pelangganController.create);
router.put('/:id', validatePelanggan, pelangganController.update);
router.delete('/:id', pelangganController.delete);

module.exports = router;
