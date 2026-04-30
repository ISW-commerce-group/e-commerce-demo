const UserService = require('../services/userService');

class UserController {

    static async get_all_users(req, res) {
        try {
            const users = await UserService.getAllUsers();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
            console.log('Exception: ${err}');
        }
    }

    static async get_user_by_id(req, res) {
        try {
            const user = await UserService.getUserById(req.params.id);
            res.json(user);
        } catch (error) {
            res.status(error.message.includes('not found') ? 404 : 400)
               .json({ error: error.message });
        }
    }

    static async get_user_by_email(req, res) {
        try {
            const user = await UserService.getUserByEmail(req.params.email);
            res.json(user);
        } catch (error) {
            res.status(error.message.includes('not found') ? 404 : 400)
               .json({ error: error.message });
        }
    }

    static async create_user(req, res) {
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

    static async update_user(req, res) {
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

    static async delete_user(req, res) {
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