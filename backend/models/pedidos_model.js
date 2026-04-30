const db = require('../db');

const baseFields = ['id', 'usuario_id', 'repartidor_id', 'codigo_pedido', 'tipo_entrega', 'estado', 'subtotal', 'costo_envio', 'total', 'fecha_entrega', 'notas', 'created_at', 'updated_at'];

class pedidos_model {

    static baseQuery() {
        return db('pedidos').select(baseFields);
    }

    static async find_all() {
        return this.baseQuery().orderBy('created_at', 'desc');
    }

    static async find_by_id(id) {
        return this.baseQuery().where({ id }).first();
    }

    static async create(data) {
        const { usuario_id, repartidor_id, codigo_pedido, tipo_entrega, estado, subtotal, costo_envio, total, fecha_entrega, notas } = data;

        const [id] = await db('pedidos').insert({
            usuario_id,
            repartidor_id,
            codigo_pedido,
            tipo_entrega,
            estado: estado ?? 'pendiente',
            subtotal,
            costo_envio: costo_envio ?? 0.00,
            total,
            fecha_entrega,
            notas
        });

        return this.find_by_id(id);
    }

    static async update(id, data) {
        const updateData = {};

        const allowed = ['usuario_id', 'repartidor_id', 'codigo_pedido', 'tipo_entrega', 'estado', 'subtotal', 'costo_envio', 'total', 'fecha_entrega', 'notas'];

        for (const key of allowed) {
            if (data[key] !== undefined) updateData[key] = data[key];
        }

        if (Object.keys(updateData).length === 0) return null;

        await db('pedidos').where({ id }).update(updateData);

        return this.find_by_id(id);
    }

    static async delete(id) {
        return await db('pedidos').where({ id }).delete();
    }
}

module.exports = pedidos_model;
