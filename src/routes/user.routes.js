const express = require('express');
const { get, post, remove, login } = require('../controllers/user.controller');
const { jwt } = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', jwt, get).post('/', post);

router.post('/login', login);

router.delete('/:userId', remove);

router.post('/auth', post);

module.exports = router;
