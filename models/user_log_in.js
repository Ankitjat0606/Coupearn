const { DataTypes } = require('sequelize');
const { sequelize } = require('../databases/mysql'); // Import Sequelize instance

const UserLogIn = sequelize.define('UserLogIn', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "user_id",
    },
    type: {
        type: DataTypes.ENUM("email", "phone"),
        allowNull: false,
    },
    secretKey: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "secret_key",
    },
    secretPass: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "secret_pass",
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
}, {
    tableName: 'user_log_ins', // Ensure table name consistency
    timestamps: true,  // Adds createdAt & updatedAt fields
});

module.exports = UserLogIn;
