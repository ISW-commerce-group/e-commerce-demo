const UserService = require('../services/userService');

class UserController {

    static async getAllUsers(req, res) {
        try {
            const users = await UserService.getAllUsers();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async getUserById(req, res) {
        try {
            const user = await UserService.getUserById(req.params.id);
            res.json(user);
        } catch (error) {
            res.status(error.message.includes('not found') ? 404 : 400)
               .json({ error: error.message });
        }
    }

    static async getUserByEmail(req, res) {
        try {
            const user = await UserService.getUserByEmail(req.params.email);
            res.json(user);
        } catch (error) {
            res.status(error.message.includes('not found') ? 404 : 400)
               .json({ error: error.message });
        }
    }

    static async createUser(req, res) {
        try {
            const createdUser = await UserService.createUser(req.body);

            res.status(201).json({
                message: 'User created successfully',
                user: createdUser
            });

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async updateUser(req, res) {
        try {
            const id = req.params.id;

            const updatedUser = await UserService.updateUser(id, req.body);

            res.json({
                message: 'User updated successfully',
                user: updatedUser
            });

        } catch (error) {
            res.status(error.message.includes('not found') ? 404 : 400)
               .json({ error: error.message });
        }
    }

    static async deleteUser(req, res) {
        try {
            const deletedUser = await UserService.deleteUser(req.params.id);

            res.json({
                message: 'User deleted successfully',
                user: deletedUser
            });

        } catch (error) {
            res.status(error.message.includes('not found') ? 404 : 400)
               .json({ error: error.message });
        }
    }
}

module.exports = UserController;