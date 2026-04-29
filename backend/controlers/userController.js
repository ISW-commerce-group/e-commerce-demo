const UserService = require('../services/userService');

class UserController {
    static async getAllUsers(req, res) {
        try {
            const users = await UserService.getAllUsers();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getUserById(req, res) {
        try {
            const user = await UserService.getUserById(req.params.id);
            res.json(user);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    static async getUserByEmail(req, res) {
        try {
            const {email} = req.params;
            const user = await UserService.getUserByEmail(email);

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
             const user_id = user.id;
             
            return res.json(user);
        } catch (error) {
            console.error('Error fetching user by email:', error);
            res.status(500).json({ error: error.message });
        }
    }

    static async createUser(req, res) {
        try {
            const newUser = {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                email: req.body.email,
                telefono: req.body.telefono,
                password_hash: req.body.password_hash,
                rol_id: req.body.rol_id
             };

                const createdUser = await UserService.createUser(newUser);
                res.status(201).json({message: 'User created successfully', user: createdUser});
            }catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async updateUser(req, res) {
        try {
            const id = req.params.id;
            const user = {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                email: req.body.email,
                telefono: req.body.telefono,
                password_hash: req.body.password_hash,
                rol_id: req.body.rol_id
            };
            const updatedUser = await UserService.updateUser(id, {
                nombre,
                apellido,
                email,
                telefono,
                password_hash,
                rol_id
            });

            if(!updatedUser) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.json({message: 'User updated successfully', user: updatedUser});
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    static async deleteUser(req, res) {
        try {
            const id = req.params.id;
            const deletedUser = await UserService.deleteUser(id);
                if(!deletedUser) {  
                    return res.status(404).json({ error: 'User not found' });
                }

            res.json({message: 'User deleted successfully', user: deletedUser});
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }
}

module.exports = UserController;