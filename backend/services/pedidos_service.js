const pedidos_model = require('../models/pedidos_model');
const { AppError } = require('../middlewares/error.middleware');

class pedidos_service {

    static async get_all() {
        return await pedidos_model.find_all();
    }

    static async get_by_id(id) {
        const pedido = await pedidos_model.find_by_id(id);

        if (!pedido) {
            throw new AppError(`Pedido con id ${id} no encontrado`, 404);
        }

        return pedido;
    }

    static async create(data) {
        const { usuario_id, codigo_pedido, tipo_entrega, subtotal, total } = data;

        if (!usuario_id || !codigo_pedido || !tipo_entrega || subtotal === undefined || total === undefined) {
            throw new AppError(
                'Faltan campos requeridos: usuario_id, codigo_pedido, tipo_entrega, subtotal, total',
                400
            );
        }

        const valid_tipos = ['delivery', 'pickup'];
        if (!valid_tipos.includes(tipo_entrega)) {
            throw new AppError(
                `tipo_entrega debe ser uno de: ${valid_tipos.join(', ')}`,
                400
            );
        }

        const insertId = await pedidos_model.create(data);
        return await pedidos_model.find_by_id(insertId);
    }

    static async update(id, data) {
        await pedidos_service.get_by_id(id); // valida existencia

        if (data.tipo_entrega) {
            const valid_tipos = ['delivery', 'pickup'];
            if (!valid_tipos.includes(data.tipo_entrega)) {
                throw new AppError(
                    `tipo_entrega debe ser uno de: ${valid_tipos.join(', ')}`,
                    400
                );
            }
        }

        if (data.estado) {
            const valid_estados = [
                'pendiente',
                'confirmado',
                'preparando',
                'en_camino',
                'listo_pickup',
                'entregado',
                'cancelado'
            ];

            if (!valid_estados.includes(data.estado)) {
                throw new AppError(
                    `estado debe ser uno de: ${valid_estados.join(', ')}`,
                    400
                );
            }
        }

        await pedidos_model.update(id, data);
        return await pedidos_model.find_by_id(id);
    }

    static async delete(id) {
        await pedidos_service.get_by_id(id);
        await pedidos_model.delete(id);

        return { message: `Pedido ${id} eliminado correctamente` };
    }
}

module.exports = pedidos_service;
