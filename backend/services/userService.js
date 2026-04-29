const UserModel = require('../models/userModel');

class UserService {
    static async getAllUsers() {
        try {
        return UserModel.getAllUsers();
        } catch (error) {
            throw new Error('Error fetching users: ' + error.message);
        }
    }

    static async getUserById(id) {
        try {
            if(!id) {
                throw new Error('User ID is required');
            }

            const user = await UserModel.getUserById(id);
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        } catch (error) {
            throw new Error('Error fetching user: ' + error.message);
        }
    }

    static async getUserByEmail(email) {
        try {
            if(!email) {
                throw new Error('Email is required');
            }   
            const user = await UserModel.getUserByEmail(email);
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        } catch (error) {
            throw new Error('Error fetching user: ' + error.message);
        }   
    }

    static async createUser(user) {
        try {
            // Validar campos requeridos
            if (!user.nombre || !user.apellido || !user.email || !user.password_hash || !user.rol_id) {
                throw new Error('Missing required fields: nombre, apellido, email, password_hash, rol_id');
            }
            return UserModel.createUser(user);
        
        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(user.email)) {
            throw new Error('Invalid email format');
        }

        //verificar que el email no exista ya en la base de datos
        const existingUser = await UserModel.getUserByEmail(user.email);
        if (existingUser) {
            throw new Error('Email already in use');
        }

        //validar password_hash tenga al menos 8 caracteres
        if (user.password_hash.length < 8) {
            throw new Error('Password must be at least 8 characters long');
        }

        const createdUser = await UserModel.createUser({
            nombre, 
            apellido,
            email,
            password_hash,
            rol_id,
            telefono
        });
        return createdUser;

        } catch (error) {
            throw new Error('Error creating user: ' + error.message);
        }

        
    }

    static async updateUser(id, user) {
        try {
            if (!id) {
                throw new Error('User ID is required');
            }

            // Validar que el usuario exista antes de actualizar
            const existingUser = await UserModel.getUserById(id);
            if (!existingUser) {
                throw new Error('User not found');
            }

            // Validar formato de email si se está actualizando
            if (email && email !== existingUser.email) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    throw new Error('Invalid email format');
                }
                   const emailInUse = await UserModel.getUserByEmail(email);
                    if (emailInUse) {
                        throw new Error('Email already in use');
                    }
            }

            //validar password_hash tenga al menos 8 caracteres si se está actualizando
            if (password_hash && password_hash.length < 8) {
                throw new Error('Password must be at least 8 characters long');
            }

            const updatedUser = await UserModel.updateUser(id, {
                nombre, apellido, telefono, email, password_hash, rol_id
            })

            if (!updatedUser) {
                throw new Error('Error updating user');
            }
            
            return await UserModel.getUserById(id);
        } catch (error) {
            throw new Error('Error updating user: ' + error.message);
        }
    }

    static async deleteUser(id) {
        try {
            if (!id) {
                throw new Error('User ID is required');
            }
            const existingUser = await UserModel.getUserById(id);
            if (!existingUser) {
                throw new Error('User not found');
            }

            const deleted = await UserModel.deleteUser(id);
            if (!deleted) {
                throw new Error('Error deleting user');
            }

            return existingUser;
        } catch (error) {
            throw new Error('Error deleting user: ' + error.message);
        }
    }
}
module.exports = UserService;