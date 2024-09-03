const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const HakAkses = sequelize.define('hak_akses', {
    id_hak_akses: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    deskripsi_hak_akses: {
        type: DataTypes.STRING,
        allowNull: false
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
    tableName: 'hak_akses',
    hooks: {
        beforeCreate: (hak_akses) => {
            hak_akses.deskripsi_hak_akses = hak_akses.deskripsi_hak_akses.toUpperCase();
        },
        beforeUpdate: (hak_akses) => {
            hak_akses.deskripsi_hak_akses = hak_akses.deskripsi_hak_akses.toUpperCase();
        }
    }
});

module.exports = HakAkses;
