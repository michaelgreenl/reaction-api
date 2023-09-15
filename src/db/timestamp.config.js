const { Sequelize } = require('sequelize');

module.exports = {
  fields: {
    updatedAt: {
      type: 'TIMESTAMP',
      defaultValue: Sequelize.fn('NOW'),
    },
    createdAt: {
      type: 'TIMESTAMP',
      defaultValue: Sequelize.fn('NOW'),
    },
  },
  tableOptions: {
    timestamps: false,
  },
};
