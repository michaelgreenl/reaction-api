const express = require('express');
const { get, post, remove } = require('../controllers/game.controller');

const router = express.Router();

router.get('/', get);

router.post('/', post);

router.delete('/:userId', remove);

module.exports = router;
