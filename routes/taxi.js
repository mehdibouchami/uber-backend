const express = require('express');
const router = express.Router();
const contrTaxi = require('../controllers/taxi');



router.get('/', contrTaxi.getNearest);
router.post('/', contrTaxi.createTaxi);


module.exports = router