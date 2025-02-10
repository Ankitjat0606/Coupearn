require('dotenv').config();
module.exports = {
  production: {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST,
    port: process.env.DATABASE_PORT || 3306,
    dialect: 'mysql',
    logging: false,
  },
};
