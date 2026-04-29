const pedidos_model = require('../models/pedidos_model');

class pedidos_service {

    static async get_all() {
        return await pedidos_model.find_all();
    }

    static async get_by_id(id) {
        const pedido = await pedidos_model.find_by_id(id);
        if (!pedido) {
            const error = new Error(`Pedido con id ${id} no encontrado`);
            error.status = 404;
            throw error;
        }
        return pedido;
    }

    static async create(data) {
        const { usuario_id, codigo_pedido, tipo_entrega, subtotal, total } = data;

        if (!usuario_id || !codigo_pedido || !tipo_entrega || subtotal === undefined || total === undefined) {
            const error = new Error('Faltan campos requeridos: usuario_id, codigo_pedido, tipo_entrega, subtotal, total');
            error.status = 400;
            throw error;
        }

        const valid_tipos = ['delivery', 'pickup'];
        if (!valid_tipos.includes(tipo_entrega)) {
            const error = new Error(`tipo_entrega debe ser uno de: ${valid_tipos.join(', ')}`);
            error.status = 400;
            throw error;
        }

        const insertId = await pedidos_model.create(data);
        return await pedidos_model.find_by_id(insertId);
    }

    static async update(id, data) {
        await pedidos_service.get_by_id(id); // valida existencia

        if (data.tipo_entrega) {
            const valid_tipos = ['delivery', 'pickup'];
            if (!valid_tipos.includes(data.tipo_entrega)) {
                const error = new Error(`tipo_entrega debe ser uno de: ${valid_tipos.join(', ')}`);
                error.status = 400;
                throw error;
            }
        }

        if (data.estado) {
            const valid_estados = ['pendiente', 'confirmado', 'preparando', 'en_camino', 'listo_pickup', 'entregado', 'cancelado'];
            if (!valid_estados.includes(data.estado)) {
                const error = new Error(`estado debe ser uno de: ${valid_estados.join(', ')}`);
                error.status = 400;
                throw error;
            }
        }

        await pedidos_model.update(id, data);
        return await pedidos_model.find_by_id(id);
    }

    static async delete(id) {
        await pedidos_service.get_by_id(id); // valida existencia
        await pedidos_model.delete(id);
        return { message: `Pedido ${id} eliminado correctamente` };
    }
}

module.exports = pedidos_service;
