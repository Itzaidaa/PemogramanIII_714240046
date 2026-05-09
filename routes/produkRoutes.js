const express = require('express');
const router = express.Router();
const produkController = require('../controllers/produkController');
const { validateProduk } = require('../middleware/validation');

router.get('/', produkController.getAll);
router.get('/:id', produkController.getById);
router.post('/', validateProduk, produkController.create);
router.put('/:id', validateProduk, produkController.update);
router.delete('/:id', produkController.delete);

module.exports = router;
