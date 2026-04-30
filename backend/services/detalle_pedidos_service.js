const detalle_pedidos_model = require('../models/detalle_pedidos_model');
const pedidos_model = require('../models/pedidos_model');
const { AppError } = require('../middlewares/error_middleware');

class detalle_pedidos_service {

    //Valida que el pedido padre exista
    static async _validar_pedido(pedido_id) {
        const pedido = await pedidos_model.find_by_id(pedido_id);

        if (!pedido) {
            throw new AppError(`Pedido con id ${pedido_id} no encontrado`, 404);
        }

        return pedido;
    }

    //Valida que el detalle exista y pertenezca al pedido
    static async _validar_detalle(id, pedido_id) {
        const detalle = await detalle_pedidos_model.find_by_id(id);

        if (!detalle) {
            throw new AppError(`Detalle con id ${id} no encontrado`, 404);
        }

        if (detalle.pedido_id !== pedido_id) {
            throw new AppError(
                `El detalle ${id} no pertenece al pedido ${pedido_id}`,
                403
            );
        }

        return detalle;
    }

    static async get_all_by_pedido(pedido_id) {
        await this._validar_pedido(pedido_id);
        return await detalle_pedidos_model.find_all_by_pedido(pedido_id);
    }

    static async get_by_id(id, pedido_id) {
        await this._validar_pedido(pedido_id);
        return await this._validar_detalle(id, pedido_id);
    }

    static async create(pedido_id, data) {
        await this._validar_pedido(pedido_id);

        const { producto_id, cantidad, precio_unitario } = data;

        if (!producto_id || cantidad === undefined || precio_unitario === undefined) {
            throw new AppError(
                'Faltan campos requeridos: producto_id, cantidad, precio_unitario',
                400
            );
        }

        if (cantidad <= 0) {
            throw new AppError('La cantidad debe ser mayor a 0', 400);
        }

        if (precio_unitario < 0) {
            throw new AppError('El precio_unitario no puede ser negativo', 400);
        }

        //Calcular subtotal automáticamente
        const subtotal = data.subtotal ?? Number((cantidad * precio_unitario).toFixed(2));

        const insertId = await detalle_pedidos_model.create({
            pedido_id,
            producto_id,
            cantidad,
            precio_unitario,
            subtotal
        });

        return await detalle_pedidos_model.find_by_id(insertId);
    }

    static async update(id, pedido_id, data) {
        await this._validar_pedido(pedido_id);
        const actual = await this._validar_detalle(id, pedido_id);

        if (data.cantidad !== undefined && data.cantidad <= 0) {
            throw new AppError('La cantidad debe ser mayor a 0', 400);
        }

        if (data.precio_unitario !== undefined && data.precio_unitario < 0) {
            throw new AppError('El precio_unitario no puede ser negativo', 400);
        }

        // Recalcular subtotal si cambia cantidad o precio
        if (
            (data.cantidad !== undefined || data.precio_unitario !== undefined) &&
            data.subtotal === undefined
        ) {
            const nuevaCantidad = data.cantidad ?? actual.cantidad;
            const nuevoPrecio = data.precio_unitario ?? actual.precio_unitario;

            data.subtotal = Number((nuevaCantidad * nuevoPrecio).toFixed(2));
        }

        await detalle_pedidos_model.update(id, data);
        return await detalle_pedidos_model.find_by_id(id);
    }

    static async delete(id, pedido_id) {
        await this._validar_pedido(pedido_id);
        await this._validar_detalle(id, pedido_id);

        await detalle_pedidos_model.delete(id);

        return {
            message: `Detalle ${id} eliminado correctamente del pedido ${pedido_id}`
        };
    }
}

module.exports = detalle_pedidos_service;