const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./userModel');
const Gudang = require('./gudangModel');

const CheckerGUdang = sequelize.define('checker_gudang', {
    id_checker_gudang: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id_user'
        }
    },
    id_gudang: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Gudang,
            key: 'id_gudang'
        }
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: false,
    tableName: 'checker_gudang',
});

CheckerGUdang.belongsTo(User, { foreignKey: 'id_user', as: 'user' });
CheckerGUdang.belongsTo(Gudang, { foreignKey: 'id_gudang', as: 'gudang' });

module.exports = CheckerGUdang;
