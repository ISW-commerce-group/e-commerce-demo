const db = require('../db');

const baseFields = ['id', 'nombre', 'apellido', 'email', 'rol_id', 'telefono', 'activo'];

class UserModel {

    static baseQuery() {
        return db('usuarios').select(baseFields);
    }

    static async getAllUsers() {
        return this.baseQuery();
    }

    static async getUserById(id) {
        return this.baseQuery().where({ id }).first();
    }

    static async getUserByEmail(email) {
        return this.baseQuery().where({ email }).first();
    }

    static async createUser(user) {
        const [newUser] = await db('usuarios')
            .insert({
                nombre: user.nombre,
                apellido: user.apellido,
                rol_id: user.rol_id,
                email: user.email,
                password_hash: user.password_hash,
                telefono: user.telefono
            })
            .returning(baseFields);

        return newUser;
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

        const [updatedUser] = await db('usuarios')
            .where({ id })
            .update(updateData)
            .returning(baseFields);

        return updatedUser || null;
    }

    static async deleteUser(id) {
        // 🔹 Soft delete recomendado
        const [updatedUser] = await db('usuarios')
            .where({ id })
            .update({ activo: false })
            .returning(baseFields);

        return updatedUser || null;
    }
}

module.exports = UserModel;