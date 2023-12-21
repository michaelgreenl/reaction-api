const express = require('express');
const { get, post, remove } = require('../controllers/game.controller');

const router = express.Router();

router.get('/', get);

router.post('/', post);

router.delete('/:userId/:statsId', remove);

module.exports = router;
