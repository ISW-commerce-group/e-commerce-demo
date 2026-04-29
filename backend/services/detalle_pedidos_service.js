const detalle_pedidos_model = require('../models/detalle_pedidos_model');
const pedidos_model = require('../models/pedidos_model');

class detalle_pedidos_service {

    // Valida que el pedido padre exista
    static async _validar_pedido(pedido_id) {
        const pedido = await pedidos_model.find_by_id(pedido_id);
        if (!pedido) {
            const error = new Error(`Pedido con id ${pedido_id} no encontrado`);
            error.status = 404;
            throw error;
        }
        return pedido;
    }

    // Valida que el detalle exista y pertenezca al pedido indicado
    static async _validar_detalle(id, pedido_id) {
        const detalle = await detalle_pedidos_model.find_by_id(id);
        if (!detalle) {
            const error = new Error(`Detalle con id ${id} no encontrado`);
            error.status = 404;
            throw error;
        }
        if (detalle.pedido_id !== pedido_id) {
            const error = new Error(`El detalle ${id} no pertenece al pedido ${pedido_id}`);
            error.status = 403;
            throw error;
        }
        return detalle;
    }

    static async get_all_by_pedido(pedido_id) {
        await detalle_pedidos_service._validar_pedido(pedido_id);
        return await detalle_pedidos_model.find_all_by_pedido(pedido_id);
    }

    static async get_by_id(id, pedido_id) {
        await detalle_pedidos_service._validar_pedido(pedido_id);
        return await detalle_pedidos_service._validar_detalle(id, pedido_id);
    }

    static async create(pedido_id, data) {
        await detalle_pedidos_service._validar_pedido(pedido_id);

        const { producto_id, cantidad, precio_unitario } = data;

        if (!producto_id || !cantidad || precio_unitario === undefined) {
            const error = new Error('Faltan campos requeridos: producto_id, cantidad, precio_unitario');
            error.status = 400;
            throw error;
        }

        if (cantidad <= 0) {
            const error = new Error('La cantidad debe ser mayor a 0');
            error.status = 400;
            throw error;
        }

        if (precio_unitario < 0) {
            const error = new Error('El precio_unitario no puede ser negativo');
            error.status = 400;
            throw error;
        }

        // Calcular subtotal automáticamente si no viene en el body
        const subtotal = data.subtotal ?? parseFloat((cantidad * precio_unitario).toFixed(2));

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
        await detalle_pedidos_service._validar_pedido(pedido_id);
        await detalle_pedidos_service._validar_detalle(id, pedido_id);

        if (data.cantidad !== undefined && data.cantidad <= 0) {
            const error = new Error('La cantidad debe ser mayor a 0');
            error.status = 400;
            throw error;
        }

        if (data.precio_unitario !== undefined && data.precio_unitario < 0) {
            const error = new Error('El precio_unitario no puede ser negativo');
            error.status = 400;
            throw error;
        }

        // Recalcular subtotal si cambian cantidad o precio_unitario y no viene subtotal explícito
        if ((data.cantidad !== undefined || data.precio_unitario !== undefined) && data.subtotal === undefined) {
            const actual = await detalle_pedidos_model.find_by_id(id);
            const nueva_cantidad      = data.cantidad       ?? actual.cantidad;
            const nuevo_precio        = data.precio_unitario ?? actual.precio_unitario;
            data.subtotal = parseFloat((nueva_cantidad * nuevo_precio).toFixed(2));
        }

        await detalle_pedidos_model.update(id, data);
        return await detalle_pedidos_model.find_by_id(id);
    }

    static async delete(id, pedido_id) {
        await detalle_pedidos_service._validar_pedido(pedido_id);
        await detalle_pedidos_service._validar_detalle(id, pedido_id);
        await detalle_pedidos_model.delete(id);
        return { message: `Detalle ${id} eliminado correctamente del pedido ${pedido_id}` };
    }
}

module.exports = detalle_pedidos_service;
