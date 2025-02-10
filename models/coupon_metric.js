const { DataTypes } = require('sequelize');
const { sequelize } = require('../databases/mysql'); // Import Sequelize instance

const CouponMetric = sequelize.define('CouponMetric', {
    couponId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "coupon_id"
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
    tableName: 'coupon_metrics', // Ensure table name consistency
    timestamps: true,  // Adds createdAt & updatedAt fields
});

module.exports = CouponMetric;
