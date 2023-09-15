const dotenv = require('dotenv');
const environment = process.env.NODE_ENV || 'development';
dotenv.config({
  path: `.env.${environment}`,
});

const { SQL_DATABASE, SQL_HOST, SQL_USER, SQL_PASSWORD } = process.env;
module.exports = {
  database: SQL_DATABASE,
  dialect: 'mysql',
  host: SQL_HOST,
  username: SQL_USER,
  password: SQL_PASSWORD,
  dialectOptions: {
    bigNumberStrings: true,
  },
  seederStorage: 'sequelize',
  seederStorageTableName: 'SequelizeSeedMeta',
};
