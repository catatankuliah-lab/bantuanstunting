const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Alokasi = sequelize.define('alokasi', {
    id_alokasi: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    bulan_alokasi: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tahun_alokasi: {
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
    tableName: 'alokasi',
    hooks: {
        beforeCreate: (alokasi) => {
            alokasi.bulan_alokasi = alokasi.bulan_alokasi.toUpperCase();
            alokasi.tahun_alokasi = alokasi.tahun_alokasi.toUpperCase();
        },
        beforeUpdate: (alokasi) => {
            alokasi.bulan_alokasi = alokasi.bulan_alokasi.toUpperCase();
            alokasi.tahun_alokasi = alokasi.tahun_alokasi.toUpperCase();
        }
    }
});

module.exports = Alokasi;
