const { User } = require('../models');

const createUser = async ({ username, password }) => User.create({ username, password });

const deleteUser = async (userId) => User.destroy({ where: { id: userId } });

const getAllUsers = async ({ limit, offset }) => User.findAll({ limit, offset, attributes: { exclude: ['password'] } });

const getUserByUsername = (username) =>
    User.findOne({
        where: {
            username,
        },
        attributes: {
            exclude: ['password'],
        },
    });

const getUserById = (userId) =>
    User.findOne({
        where: {
            id: userId,
        },
        attributes: {
            exclude: ['password'],
        },
    });

const getUserWithPasswordByUsername = (username) =>
    User.findOne({
        where: {
            username,
        },
    });

const updateUserInfo = ({ userId, username, password }) =>
    User.update(
        {
            username,
            password,
        },
        {
            where: {
                id: userId,
            },
        },
    ).then(Boolean);

module.exports = {
    getAllUsers,
    getUserByUsername,
    getUserById,
    getUserWithPasswordByUsername,
    createUser,
    updateUserInfo,
    deleteUser,
};
