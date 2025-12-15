const bcrypt = require('bcrypt');
const userRepository = require('../db/repositories/user.repository');
const statsRepository = require('../db/repositories/stats.repository');
const gameRepository = require('../db/repositories/game.repository');
const settingsRepository = require('../db/repositories/settings.repository');
const jwt = require('../util/jwt.util');
const { UNAUTHORIZED, NOT_FOUND, UNPROCESSABLE_ENTITY } = require('../constants');

module.exports.get = async (req, res) => {
    const { limit, offset } = req.query;
    res.send({ users: await userRepository.getAllUsers({ limit, offset }) });
};

module.exports.checkAuth = async (req, res) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.json({ success: false, message: 'Not authenticated', id: null, username: null });
        }

        const decoded = jwt.verify(token);
        const userId = decoded.id;

        const user = await userRepository.getUserById(userId);
        if (!user) {
            return res.json({ success: false, message: 'User not found', id: null, username: null });
        } else {
            const stats = await statsRepository.getStatsById(userId);
            const settings = await settingsRepository.getSettingsById(userId);
            res.json({
                success: true,
                message: 'Authentication successful',
                id: user.id,
                username: user.username,
                stats,
                settings,
            });
        }
    } catch (error) {
        console.error('Auth check error:', error);
        res.json({ success: false, message: 'Authentication failed: ' + error.message });
    }
};

module.exports.post = async (req, res) => {
    try {
        const { username, password } = req.body;
        const hash = await bcrypt.hash(password, 10);
        const user = await userRepository.createUser({ username, password: hash });

        const token = jwt.sign({ id: user.id, username: user.username });

        const { id } = user;
        await statsRepository.createStats({ userId: id });
        await settingsRepository.createSettings({ userId: id });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.send({ id, username: user.username });
    } catch (error) {
        if (error.errors && error.errors[0].type === 'unique violation') {
            res.status(UNPROCESSABLE_ENTITY).json({ message: 'Username is already in use.' });
        } else {
            res.send(error);
        }
    }
};

module.exports.put = async (req, res) => {
    try {
        const { userId } = req.params;
        const { username, password } = req.body;
        const hash = await bcrypt.hash(password, 10);
        await userRepository.updateUserInfo({ userId, username, password: hash });
        res.send();
    } catch (error) {
        if (error.errors && error.errors[0].type === 'unique violation') {
            res.status(UNPROCESSABLE_ENTITY).json({ message: 'Username is already in use.' });
        } else {
            res.send(error);
        }
    }
};

module.exports.remove = async (req, res) => {
    try {
        const { userId } = req.params;
        await userRepository.deleteUser(userId);
        await statsRepository.deleteStats(userId);
        await gameRepository.deleteGames(userId);
        await settingsRepository.deleteSettings(userId);
        res.send();
    } catch (error) {
        res.send(error);
    }
};

module.exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        let user = await userRepository.getUserWithPasswordByUsername(username);
        if (!user) {
            res.status(NOT_FOUND).json({ message: "There isn't an account linked with that username." });
            return;
        }
        const match = await bcrypt.compare(password, user.password);
        delete user.password;
        if (!match) {
            res.status(UNAUTHORIZED).json({ message: 'Your password was incorrect.' });
            return;
        }

        const token = jwt.sign({ id: user.id, username: user.username });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.send({ id: user.id, username: user.username });
    } catch (error) {
        res.send(error);
    }
};

module.exports.logout = async (req, res) => {
    try {
        res.clearCookie('token');
        res.json({ success: true, message: 'Logged out successfully' });
    } catch (error) {
        res.send(error);
    }
};
