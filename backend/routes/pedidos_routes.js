const express = require('express');
const router = express.Router();
const pedidos_controller = require('../controllers/pedidos_controller');

// GET    /api/pedidos          → obtener todos los pedidos
// GET    /api/pedidos/:id      → obtener pedido por id
// POST   /api/pedidos          → crear nuevo pedido
// PUT    /api/pedidos/:id      → actualizar pedido completo / parcial
// DELETE /api/pedidos/:id      → eliminar pedido

router.get('/',       pedidos_controller.get_all);
router.get('/:id',    pedidos_controller.get_by_id);
router.post('/',      pedidos_controller.create);
router.put('/:id',    pedidos_controller.update);
router.delete('/:id', pedidos_controller.delete);

module.exports = router;
