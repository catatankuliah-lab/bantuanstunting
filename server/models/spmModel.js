const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const SPM = sequelize.define('SPM', {
    id_spm: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nomor_spm: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tanggal_spm: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    nomor_so: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    nomor_do: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    nomor_mobil: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nama_driver: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nomor_driver: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    qr_spm: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    id_gudang: {
        type: DataTypes.INTEGER,
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
    tableName: 'spm',
    hooks: {
        beforeCreate: (SPM) => {
            SPM.nomor_so = SPM.nomor_so.toUpperCase();
            SPM.nomor_do = SPM.nomor_do.toUpperCase();
            SPM.nomor_mobil = SPM.nomor_mobil.toUpperCase();
            SPM.nama_driver = SPM.nama_driver.toUpperCase();
            SPM.nomor_driver = SPM.nomor_driver.toUpperCase();
        },
        beforeUpdate: (SPM) => {
            SPM.nomor_so = SPM.nomor_so.toUpperCase();
            SPM.nomor_do = SPM.nomor_do.toUpperCase();
            SPM.nomor_mobil = SPM.nomor_mobil.toUpperCase();
            SPM.nama_driver = SPM.nama_driver.toUpperCase();
            SPM.nomor_driver = SPM.nomor_driver.toUpperCase();
        },
    },
});


module.exports = SPM;
