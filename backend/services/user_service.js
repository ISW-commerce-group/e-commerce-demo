const UserModel = require('../models/userModel');
const validator = require('validator');
const { AppError } = require('../middlewares/error.middleware');

class UserService {

    static validateEmail(email) {
        if (typeof email !== 'string' || email.length > 254) return false;
        return validator.isEmail(email);
    }

    static async getAllUsers(searchQuery) {
        if (searchQuery && searchQuery.length > 100) {
            throw new AppError('Input demasiado largo', 400);
        }

        const safeRegex = /^[a-z0-9]+$/i;
        if (searchQuery && !safeRegex.test(searchQuery)) {
            throw new AppError('Formato inválido', 400);
        }

        return UserModel.getAllUsers(searchQuery);
    }

    static async getUserById(id) {
        if (!id) {
            throw new AppError('User ID is required', 400);
        }

        const user = await UserModel.getUserById(id);

        if (!user) {
            throw new AppError('User not found', 404);
        }

        return user;
    }

    static async getUserByEmail(email) {
        if (!email) {
            throw new AppError('Email is required', 400);
        }

        const user = await UserModel.getUserByEmail(email);

        if (!user) {
            throw new AppError('User not found', 404);
        }

        return user;
    }

    static async createUser(user) {
        const { nombre, apellido, email, password_hash, rol_id, telefono } = user;

        if (!nombre || !apellido || !email || !password_hash || !rol_id) {
            throw new AppError('Missing required fields', 400);
        }

        if (!this.validateEmail(email)) {
            throw new AppError('Invalid email format', 400);
        }

        const existingUser = await UserModel.getUserByEmail(email);
        if (existingUser) {
            throw new AppError('Email already in use', 409);
        }

        if (password_hash.length < 8) {
            throw new AppError('Password must be at least 8 characters long', 400);
        }

        return await UserModel.createUser({
            nombre,
            apellido,
            email,
            password_hash,
            rol_id,
            telefono
        });
    }

    static async updateUser(id, user) {
        if (!id) {
            throw new AppError('User ID is required', 400);
        }

        const existingUser = await UserModel.getUserById(id);
        if (!existingUser) {
            throw new AppError('User not found', 404);
        }

        const { nombre, apellido, telefono, email, password_hash, rol_id } = user;

        if (email && email !== existingUser.email) {
            if (!this.validateEmail(email)) {
                throw new AppError('Invalid email format', 400);
            }

            const emailInUse = await UserModel.getUserByEmail(email);
            if (emailInUse) {
                throw new AppError('Email already in use', 409);
            }
        }

        if (password_hash && password_hash.length < 8) {
            throw new AppError('Password must be at least 8 characters long', 400);
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
    }

    static async deleteUser(id) {
        if (!id) {
            throw new AppError('User ID is required', 400);
        }

        const existingUser = await UserModel.getUserById(id);
        if (!existingUser) {
            throw new AppError('User not found', 404);
        }

        await UserModel.deleteUser(id);

        return existingUser;
    }
}

module.exports = UserService;