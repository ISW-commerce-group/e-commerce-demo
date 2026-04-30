const UserService = require('../services/user_service');

class UserController {

    static async get_all(req, res, next) {
        try {
            const users = await UserService.get_all(req.query.search);
            res.json(users);
        } catch (error) {
            next(error);
        }
    }

    static async get_by_id(req, res, next) {
        try {
            const user = await UserService.get_by_id(req.params.id);
            res.json(user);
        } catch (error) {
            next(error);
        }
    }

    static async get_by_email(req, res, next) {
        try {
            const user = await UserService.get_by_email(req.params.email);
            res.json(user);
        } catch (error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        try {
            const createdUser = await UserService.create(req.body);

            res.status(201).json({
                success: true,
                message: 'User created successfully',
                user: createdUser
            });

        } catch (error) {
            next(error);
        }
    }

    static async update(req, res, next) {
        try {
            const updatedUser = await UserService.update(
                req.params.id,
                req.body
            );

            res.json({
                success: true,
                message: 'User updated successfully',
                user: updatedUser
            });

        } catch (error) {
            next(error);
        }
    }

    static async delete(req, res, next) {
        try {
            const deletedUser = await UserService.delete(req.params.id);

            res.json({
                success: true,
                message: 'User deleted successfully',
                user: deletedUser
            });

        } catch (error) {
            next(error);
        }   
    }
}

module.exports = UserController;