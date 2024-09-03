const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const KantorCabang = sequelize.define('kantor_cabang', {
    id_kantor_cabang: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nama_kantor_cabang: {
        type: DataTypes.STRING,
        allowNull: false
    },
    alamat_kantor_cabang: {
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
    tableName: 'kantor_cabang',
    hooks: {
        beforeCreate: (kantor_cabang) => {
            kantor_cabang.nama_kantor_cabang = kantor_cabang.nama_kantor_cabang.toUpperCase();
        },
        beforeUpdate: (kantor_cabang) => {
            kantor_cabang.nama_kantor_cabang = kantor_cabang.nama_kantor_cabang.toUpperCase();
        }
    }
});

module.exports = KantorCabang;
