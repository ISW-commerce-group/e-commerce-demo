const db = require('../db');

const baseFields = ['id', 'pedido_id', 'producto_id', 'cantidad', 'precio_unitario', 'subtotal'];

class detalle_pedidos_model {

    static baseQuery() {
        return db('detalle_pedidos').select(baseFields);
    }

    static async find_all_by_pedido(pedido_id) {
        return this.baseQuery().where({ pedido_id });
    }

    static async find_by_id(id) {
        return this.baseQuery().where({ id }).first();
    }

    static async create(data) {
        const { pedido_id, producto_id, cantidad, precio_unitario, subtotal } = data;

        const [id] = await db('detalle_pedidos').insert({
            pedido_id,
            producto_id,
            cantidad,
            precio_unitario,
            subtotal
        });

        return this.find_by_id(id);
    }

    static async update(id, data) {
        const updateData = {};

        const allowed = ['producto_id', 'cantidad', 'precio_unitario', 'subtotal'];

        for (const key of allowed) {
            if (data[key] !== undefined) updateData[key] = data[key];
        }

        if (Object.keys(updateData).length === 0) return null;

        await db('detalle_pedidos').where({ id }).update(updateData);

        return this.find_by_id(id);
    }

    static async delete(id) {
        return await db('detalle_pedidos').where({ id }).delete();
    }

    static async delete_all_by_pedido(pedido_id) {
        return await db('detalle_pedidos').where({ pedido_id }).delete();
    }
}

module.exports = detalle_pedidos_model;
