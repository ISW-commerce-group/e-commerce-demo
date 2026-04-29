const UserModel = require('../models/userModel');

class UserService {

    static validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    static async getAllUsers() {
        try {
            return await UserModel.getAllUsers();
        } catch (error) {
            throw new Error('Error fetching users: ' + error.message);
        }
    }

    static async getUserById(id) {
        try {
            if (!id) throw new Error('User ID is required');

            const user = await UserModel.getUserById(id);
            if (!user) throw new Error('User not found');

            return user;
        } catch (error) {
            throw new Error('Error fetching user: ' + error.message);
        }
    }

    static async getUserByEmail(email) {
        try {
            if (!email) throw new Error('Email is required');

            const user = await UserModel.getUserByEmail(email);
            if (!user) throw new Error('User not found');

            return user;
        } catch (error) {
            throw new Error('Error fetching user: ' + error.message);
        }
    }

    static async createUser(user) {
        try {
            const { nombre, apellido, email, password_hash, rol_id, telefono } = user;

            if (!nombre || !apellido || !email || !password_hash || !rol_id) {
                throw new Error('Missing required fields');
            }

            if (!this.validateEmail(email)) {
                throw new Error('Invalid email format');
            }

            const existingUser = await UserModel.getUserByEmail(email);
            if (existingUser) {
                throw new Error('Email already in use');
            }

            if (password_hash.length < 8) {
                throw new Error('Password must be at least 8 characters long');
            }

            return await UserModel.createUser({
                nombre,
                apellido,
                email,
                password_hash,
                rol_id,
                telefono
            });

        } catch (error) {
            throw new Error('Error creating user: ' + error.message);
        }
    }

    static async updateUser(id, user) {
        try {
            if (!id) throw new Error('User ID is required');

            const existingUser = await UserModel.getUserById(id);
            if (!existingUser) throw new Error('User not found');

            const { nombre, apellido, telefono, email, password_hash, rol_id } = user;

            if (email && email !== existingUser.email) {
                if (!this.validateEmail(email)) {
                    throw new Error('Invalid email format');
                }

                const emailInUse = await UserModel.getUserByEmail(email);
                if (emailInUse) {
                    throw new Error('Email already in use');
                }
            }

            if (password_hash && password_hash.length < 8) {
                throw new Error('Password must be at least 8 characters long');
            }

            await UserModel.updateUser(id, {
                nombre,
                apellido,
                telefono,
                email,
                password_hash,
                rol_id
            });

            return await UserModel.getUserById(id);

        } catch (error) {
            throw new Error('Error updating user: ' + error.message);
        }
    }

    static async deleteUser(id) {
        try {
            if (!id) throw new Error('User ID is required');

            const existingUser = await UserModel.getUserById(id);
            if (!existingUser) throw new Error('User not found');

            await UserModel.deleteUser(id);

            return existingUser;

        } catch (error) {
            throw new Error('Error deleting user: ' + error.message);
        }
    }
}

module.exports = UserService;