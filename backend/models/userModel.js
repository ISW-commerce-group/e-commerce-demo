const db = require('../db');

class UserModel {
    static async getAllUsers() {
        return db('users').select('*');
    }   

    static async getUserById(id) {
        return db('users').where({ id }).select('*').first();
    }

    static async getUserByEmail(email) {
        return db('users').where({ email }).select('*').first();
    }

    static async createUser(user) {
        const [id] = await db('users').insert({
            nombre: user.nombre,
            apellido: user.apellido,
            rol_id: user.rol_id,
            email: user.email,
            password_hash: user.password_hash,
            telefono: user.telefono
        });
        return this.getUserById(id);
    }

    static async updateUser(id, user) {
        const updateData = {};
        if (user.nombre !== undefined) updateData.nombre = user.nombre;
        if (user.apellido !== undefined) updateData.apellido = user.apellido;
        if (user.rol_id !== undefined) updateData.rol_id = user.rol_id;
        if (user.email !== undefined) updateData.email = user.email;
        if (user.password_hash !== undefined) updateData.password_hash = user.password_hash;
        if (user.telefono !== undefined) updateData.telefono = user.telefono;
        if (user.activo !== undefined) updateData.activo = user.activo;

        const affectedRows = await db('users').where({ id }).update(updateData);
        if (affectedRows === 0) {
            throw new Error('User not found');
        }

        return this.getUserById(id);
        return affectedRows > 0;
        
    }

    static async deleteUser(id) {
        const affectedRows = await db('users').where({ id }).del();
        return affectedRows > 0;
    }
}
module.exports = UserModel;