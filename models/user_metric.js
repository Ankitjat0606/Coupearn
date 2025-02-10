const { DataTypes } = require('sequelize');
const { sequelize } = require('../databases/mysql'); // Import Sequelize instance

const UserMetric = sequelize.define('UserMetric', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "user_id"
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    value: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
}, {
    tableName: 'user_metrics', // Ensure table name consistency
    timestamps: true,  // Adds createdAt & updatedAt fields
});

module.exports = UserMetric;
