const db = require('../db');

class pedidos_model {
 
    static async find_all() {
        const [rows] = await db.query('SELECT * FROM pedidos ORDER BY created_at DESC');
        return rows;
    }
 
    static async find_by_id(id) {
        const [rows] = await db.query('SELECT * FROM pedidos WHERE id = ?', [id]);
        return rows[0] || null;
    }
 
    static async create(data) {
        const { usuario_id, repartidor_id, codigo_pedido, tipo_entrega, estado, subtotal, costo_envio, total, fecha_entrega, notas } = data;
        const [result] = await db.query(
            `INSERT INTO pedidos 
                (usuario_id, repartidor_id, codigo_pedido, tipo_entrega, estado, subtotal, costo_envio, total, fecha_entrega, notas) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [usuario_id, repartidor_id, codigo_pedido, tipo_entrega, estado ?? 'pendiente', subtotal, costo_envio ?? 0.00, total, fecha_entrega, notas]
        );
        return result.insertId;
    }
 
    static async update(id, data) {
        const fields = [];
        const values = [];
 
        const allowed = ['usuario_id', 'repartidor_id', 'codigo_pedido', 'tipo_entrega', 'estado', 'subtotal', 'costo_envio', 'total', 'fecha_entrega', 'notas'];
 
        for (const key of allowed) {
            if (data[key] !== undefined) {
                fields.push(`${key} = ?`);
                values.push(data[key]);
            }
        }
 
        if (fields.length === 0) return false;
 
        values.push(id);
        const [result] = await db.query(
            `UPDATE pedidos SET ${fields.join(', ')} WHERE id = ?`,
            values
        );
        return result.affectedRows > 0;
    }
 
    static async delete(id) {
        const [result] = await db.query('DELETE FROM pedidos WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
}

module.exports = pedidos_model;
