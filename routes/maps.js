const express = require('express');
const router = express.Router();
const contrMaps = require('../controllers/maps.js');


router.get('/direction/:longdep/:altdep/:longarr/:altarr', contrMaps.getDirection);
router.get('/nearest', contrMaps.getNearest);


module.exports = router