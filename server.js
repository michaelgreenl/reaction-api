const dotenv = require('dotenv');
const environment = process.env.NODE_ENV || 'development';
dotenv.config({
    path: `.env.${environment}`,
});

const app = require('./src/app');
const db = require('./src/db/models/index.js');

const PORT = process.env.PORT || 3001;
db.sequelize
    .sync()
    .then(() => {
        app.listen(PORT, () => console.log('server running'));
    })
    .catch((error) => {
        console.error(error);
    });
