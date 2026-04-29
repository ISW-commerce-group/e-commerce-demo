const detalle_pedidos_service = require('../services/detalle_pedidos_service');

class detalle_pedidos_controller {

    static async get_all(req, res) {
        try {
            const pedido_id = Number(req.params.pedido_id);
            const detalles = await detalle_pedidos_service.get_all_by_pedido(pedido_id);
            res.status(200).json({ success: true, data: detalles });
        } catch (error) {
            res.status(error.status || 500).json({ success: false, message: error.message });
        }
    }

    static async get_by_id(req, res) {
        try {
            const pedido_id = Number(req.params.pedido_id);
            const id        = Number(req.params.id);
            const detalle   = await detalle_pedidos_service.get_by_id(id, pedido_id);
            res.status(200).json({ success: true, data: detalle });
        } catch (error) {
            res.status(error.status || 500).json({ success: false, message: error.message });
        }
    }

    static async create(req, res) {
        try {
            const pedido_id = Number(req.params.pedido_id);
            const detalle   = await detalle_pedidos_service.create(pedido_id, req.body);
            res.status(201).json({ success: true, data: detalle });
        } catch (error) {
            res.status(error.status || 500).json({ success: false, message: error.message });
        }
    }

    static async update(req, res) {
        try {
            const pedido_id = Number(req.params.pedido_id);
            const id        = Number(req.params.id);
            const detalle   = await detalle_pedidos_service.update(id, pedido_id, req.body);
            res.status(200).json({ success: true, data: detalle });
        } catch (error) {
            res.status(error.status || 500).json({ success: false, message: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const pedido_id = Number(req.params.pedido_id);
            const id        = Number(req.params.id);
            const result    = await detalle_pedidos_service.delete(id, pedido_id);
            res.status(200).json({ success: true, ...result });
        } catch (error) {
            res.status(error.status || 500).json({ success: false, message: error.message });
        }
    }
}

module.exports = detalle_pedidos_controller;
