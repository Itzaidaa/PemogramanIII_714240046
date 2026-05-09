const express = require('express');
const router = express.Router();
const pembayaranController = require('../controllers/pembayaranController');
const { validatePembayaran } = require('../middleware/validation');

router.get('/', pembayaranController.getAll);
router.get('/:id', pembayaranController.getById);
router.post('/', validatePembayaran, pembayaranController.create);
router.put('/:id', validatePembayaran, pembayaranController.update);
router.delete('/:id', pembayaranController.delete);

module.exports = router;
