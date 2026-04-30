const detalle_pedidos_service = require('../services/detalle_pedidos_service');

class detalle_pedidos_controller {

    static async get_all(req, res, next) {
        try {
            const pedido_id = Number(req.params.pedido_id);

            const detalles = await detalle_pedidos_service.get_all_by_pedido(pedido_id);

            res.status(200).json({
                success: true,
                data: detalles
            });

        } catch (error) {
            next(error);
        }
    }

    static async get_by_id(req, res, next) {
        try {
            const pedido_id = Number(req.params.pedido_id);
            const id = Number(req.params.id);

            const detalle = await detalle_pedidos_service.get_by_id(id, pedido_id);

            res.status(200).json({
                success: true,
                data: detalle
            });

        } catch (error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        try {
            const pedido_id = Number(req.params.pedido_id);

            const detalle = await detalle_pedidos_service.create(pedido_id, req.body);

            res.status(201).json({
                success: true,
                data: detalle
            });

        } catch (error) {
            next(error);
        }
    }

    static async update(req, res, next) {
        try {
            const pedido_id = Number(req.params.pedido_id);
            const id = Number(req.params.id);

            const detalle = await detalle_pedidos_service.update(id, pedido_id, req.body);

            res.status(200).json({
                success: true,
                data: detalle
            });

        } catch (error) {
            next(error);
        }
    }

    static async delete(req, res, next) {
        try {
            const pedido_id = Number(req.params.pedido_id);
            const id = Number(req.params.id);

            const result = await detalle_pedidos_service.delete(id, pedido_id);

            res.status(200).json({
                success: true,
                ...result
            });

        } catch (error) {
            next(error);
        }
    }
}

module.exports = detalle_pedidos_controller;
