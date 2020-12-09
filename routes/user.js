const express = require('express');
const router = express.Router();
const contrUser = require('../controllers/user');

router.get('/', contrUser.getAllUser);
router.get('/:id', contrUser.getUser);
router.post('/', contrUser.createUser);
router.put('/:id', contrUser.updateUser);
router.delete('/:id', contrUser.deleteUser);

module.exports = router