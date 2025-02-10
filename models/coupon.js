const { DataTypes } = require('sequelize');
const { sequelize } = require('../databases/mysql'); // Import Sequelize instance

const Coupon = sequelize.define('Coupon', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "user_id",
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    expiryTime: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "expiry_time",
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
}, {
    tableName: 'coupons', // Ensure table name consistency
    timestamps: true,  // Adds createdAt & updatedAt fields
});

module.exports = Coupon;
