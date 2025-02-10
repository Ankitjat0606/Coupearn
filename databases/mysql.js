const { Sequelize } = require('sequelize');

// Create a Sequelize instance
require('dotenv').config();
// console.log(process.env.DATABASE, process.env.USERNAME, process.env.PASSWORD, process.env.HOST);
const sequelize = new Sequelize(process.env.DATABASE, process.env.USERNAME, process.env.PASSWORD, {
  host: process.env.HOST, // e.g., 'localhost' or cloud DB host
  port: process.env.DATABASE_PORT || 3306,
  dialect: 'mysql',
  logging: true, // Disable SQL logging (optional)
});

// Test the database connection
async function testConnection() {
  try {

    await sequelize.authenticate();
    console.log('✅ Connection to MySQL has been established successfully.');
  } catch (error) {
    console.log(error.original);
    console.error('❌ Unable to connect to MySQL:', error);
  }
}

module.exports = { sequelize, testConnection };
