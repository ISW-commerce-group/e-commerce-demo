const pedidos_service = require('../services/pedidos_service');

class pedidos_controller {

    static async get_all(req, res) {
        try {
            const pedidos = await pedidos_service.get_all();
            res.status(200).json({ success: true, data: pedidos });
        } catch (error) {
            res.status(error.status || 500).json({ success: false, message: error.message });
        }
    }

    static async get_by_id(req, res) {
        try {
            const { id } = req.params;
            const pedido = await pedidos_service.get_by_id(Number(id));
            res.status(200).json({ success: true, data: pedido });
        } catch (error) {
            res.status(error.status || 500).json({ success: false, message: error.message });
        }
    }

    static async create(req, res) {
        try {
            const pedido = await pedidos_service.create(req.body);
            res.status(201).json({ success: true, data: pedido });
        } catch (error) {
            res.status(error.status || 500).json({ success: false, message: error.message });
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params;
            const pedido = await pedidos_service.update(Number(id), req.body);
            res.status(200).json({ success: true, data: pedido });
        } catch (error) {
            res.status(error.status || 500).json({ success: false, message: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params;
            const result = await pedidos_service.delete(Number(id));
            res.status(200).json({ success: true, ...result });
        } catch (error) {
            res.status(error.status || 500).json({ success: false, message: error.message });
        }
    }
}

module.exports = pedidos_controller;
