const express = require('express');
const router = express.Router();
const contrUser = require('../controllers/user');
const auth = require('../middleware/auth');

router.get('/', auth, contrUser.getAllUser);
router.get('/:id', auth, contrUser.getUser);
router.post('/', contrUser.createUser);
router.put('/:id', contrUser.updateUser);
router.delete('/:id', auth, contrUser.deleteUser);


module.exports = router