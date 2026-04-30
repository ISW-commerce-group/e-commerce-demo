const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product_controller');

router.get('/', ProductController.get_all);
router.get('/:id', ProductController.get_by_id);
router.post('/', ProductController.create);
router.put('/:id', ProductController.update);
router.delete('/:id', ProductController.delete);

module.exports = router;