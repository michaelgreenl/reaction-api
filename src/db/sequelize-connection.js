const Sequelize = require('sequelize');
const sequelizeConfig = require('../../sequelize.config.js');
const { database, host, username, password, dialect, dialectOptions } = sequelizeConfig;

const sequelize = new Sequelize(database, username, password, {
    query: { raw: true },
    host,
    dialect,
    dialectOptions,
    define: {
        hooks: {
            beforeCreate: (model) => {
                if ('createdAt' in model && !model.createdAt) {
                    model.createdAt = new Date();
                }

                if ('updatedAt' in model && !model.updatedAt) {
                    model.updatedAt = new Date();
                }
            },
            beforeUpdate: (model) => {
                if ('updatedAt' in model && !model.updatedAt) {
                    model.updatedAt = new Date();
                }
            },
            beforeUpsert: (model) => {
                if ('updatedAt' in model && !model.updatedAt) {
                    model.updatedAt = new Date();
                }
            },
            afterUpsert: (upsertResponse) => {
                // Model was updated, remove generated id
                if (!upsertResponse[1] && 'id' in upsertResponse[0]) {
                    delete upsertResponse[0].dataValues.id;
                }
            },
        },
    },
});

module.exports = { sequelize };
