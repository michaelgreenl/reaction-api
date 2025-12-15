const express = require('express');
const { get, put } = require('../controllers/stats.controller');

const router = express.Router();

router.get('/', get);
router.put('/', put);

module.exports = router;
