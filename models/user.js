const { DataTypes } = require('sequelize');
const { sequelize } = require('../databases/mysql'); // Import Sequelize instance

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  dialCode: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "dial_code"
  },
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
}, {
  tableName: 'users', // Ensure table name consistency
  timestamps: true,  // Adds createdAt & updatedAt fields
});

module.exports = User;
