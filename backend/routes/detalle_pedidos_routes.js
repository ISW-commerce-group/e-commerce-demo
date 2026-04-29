const express = require('express');
// mergeParams permite acceder a :pedido_id definido en el router padre
const router = express.Router({ mergeParams: true });
const detalle_pedidos_controller = require('../controllers/detalle_pedidos_controller');

// Todas las rutas viven bajo /api/pedidos/:pedido_id/detalles

// GET    /api/pedidos/:pedido_id/detalles          → todos los detalles del pedido
// GET    /api/pedidos/:pedido_id/detalles/:id      → un detalle específico
// POST   /api/pedidos/:pedido_id/detalles          → agregar detalle al pedido
// PUT    /api/pedidos/:pedido_id/detalles/:id      → actualizar un detalle
// DELETE /api/pedidos/:pedido_id/detalles/:id      → eliminar un detalle

router.get('/',       detalle_pedidos_controller.get_all);
router.get('/:id',    detalle_pedidos_controller.get_by_id);
router.post('/',      detalle_pedidos_controller.create);
router.put('/:id',    detalle_pedidos_controller.update);
router.delete('/:id', detalle_pedidos_controller.delete);

module.exports = router;
