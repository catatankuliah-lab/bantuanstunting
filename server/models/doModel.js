const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Lo = require('./loModel');

const Do = sequelize.define('do', {
    id_do: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_lo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Lo,
            key: 'id_lo'
        }
    },
    nomor_do: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tanggal_do: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    qr_do: {
        type: DataTypes.STRING,
        allowNull: false,
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
    tableName: 'do',
});

Do.belongsTo(Lo, { foreignKey: 'id_lo', as: 'lo' });

module.exports = Do;
