const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

router.get('/', UserController.get_all_users);
router.get('/:id', UserController.get_user_by_id);
router.get('/email/:email', UserController.get_user_by_email);

router.post('/', UserController.create_user);
router.put('/:id', UserController.update_user);
router.delete('/:id', UserController.delete_user);

module.exports = router;