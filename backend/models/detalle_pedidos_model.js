const db = require('../db');

class detalle_pedidos_model {

    static async find_all_by_pedido(pedido_id) {
        const [rows] = await db.query(
            'SELECT * FROM detalle_pedidos WHERE pedido_id = ?',
            [pedido_id]
        );
        return rows;
    }

    static async find_by_id(id) {
        const [rows] = await db.query(
            'SELECT * FROM detalle_pedidos WHERE id = ?',
            [id]
        );
        return rows[0] || null;
    }

    static async create(data) {
        const { pedido_id, producto_id, cantidad, precio_unitario, subtotal } = data;
        const [result] = await db.query(
            `INSERT INTO detalle_pedidos (pedido_id, producto_id, cantidad, precio_unitario, subtotal)
             VALUES (?, ?, ?, ?, ?)`,
            [pedido_id, producto_id, cantidad, precio_unitario, subtotal]
        );
        return result.insertId;
    }

    static async update(id, data) {
        const fields = [];
        const values = [];

        const allowed = ['producto_id', 'cantidad', 'precio_unitario', 'subtotal'];

        for (const key of allowed) {
            if (data[key] !== undefined) {
                fields.push(`${key} = ?`);
                values.push(data[key]);
            }
        }

        if (fields.length === 0) return false;

        values.push(id);
        const [result] = await db.query(
            `UPDATE detalle_pedidos SET ${fields.join(', ')} WHERE id = ?`,
            values
        );
        return result.affectedRows > 0;
    }

    static async delete(id) {
        const [result] = await db.query(
            'DELETE FROM detalle_pedidos WHERE id = ?',
            [id]
        );
        return result.affectedRows > 0;
    }

    static async delete_all_by_pedido(pedido_id) {
        const [result] = await db.query(
            'DELETE FROM detalle_pedidos WHERE pedido_id = ?',
            [pedido_id]
        );
        return result.affectedRows;
    }
}

module.exports = detalle_pedidos_model;
