const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./userModel');
const Gudang = require('./gudangModel');

const PICGUdang = sequelize.define('pic_gudang', {
    id_pic_gudang: {
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
    tableName: 'pic_gudang',
});

PICGUdang.belongsTo(User, { foreignKey: 'id_user', as: 'user' });
PICGUdang.belongsTo(Gudang, { foreignKey: 'id_gudang', as: 'gudang' });

module.exports = PICGUdang;
