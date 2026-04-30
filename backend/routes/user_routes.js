const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user_controller');

router.get('/', UserController.get_all);
router.get('/:id', UserController.get_by_id);
router.get('/email/:email', UserController.get_by_email);

router.post('/', UserController.create);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.delete);

module.exports = router;