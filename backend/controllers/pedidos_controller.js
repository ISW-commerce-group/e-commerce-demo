const pedidos_service = require('../services/pedidos_service');

class pedidos_controller {

    static async get_all(req, res, next) {
        try {
            const pedidos = await pedidos_service.get_all();

            res.status(200).json({
                success: true,
                data: pedidos
            });

        } catch (error) {
            next(error);
        }
    }

    static async get_by_id(req, res, next) {
        try {
            const { id } = req.params;

            const pedido = await pedidos_service.get_by_id(Number(id));

            res.status(200).json({
                success: true,
                data: pedido
            });

        } catch (error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        try {
            const pedido = await pedidos_service.create(req.body);

            res.status(201).json({
                success: true,
                data: pedido
            });

        } catch (error) {
            next(error);
        }
    }

    static async update(req, res, next) {
        try {
            const { id } = req.params;

            const pedido = await pedidos_service.update(Number(id), req.body);

            res.status(200).json({
                success: true,
                data: pedido
            });

        } catch (error) {
            next(error);
        }
    }

    static async delete(req, res, next) {
        try {
            const { id } = req.params;

            const result = await pedidos_service.delete(Number(id));

            res.status(200).json({
                success: true,
                ...result
            });

        } catch (error) {
            next(error);
        }
    }
}

module.exports = pedidos_controller;