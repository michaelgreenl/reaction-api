const express = require('express');
const { get, post, remove, getGamesBySetting } = require('../controllers/game.controller');

const router = express.Router();

router.get('/', get);

router.get('/filter/settings', getGamesBySetting);

router.post('/', post);

router.delete('/:userId', remove);

module.exports = router;
