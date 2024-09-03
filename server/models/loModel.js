const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Checker = require('./checkerGudangModel');
const ItemWo = require('./itemWoModel');

const Lo = sequelize.define('lo', {
    id_lo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_item_wo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: ItemWo,
            key: 'id_item_wo'
        }
    },
    id_checker_gudang: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Checker,
            key: 'id_checker_gudang'
        }
    },
    nomor_lo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tanggal_lo: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    tonase_lo: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status_lo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    jam_pemberangkatan: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    qr_lo: {
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
    tableName: 'lo',
});

Lo.belongsTo(Checker, { foreignKey: 'id_checker_gudang', as: 'checker_gudang' });
Lo.belongsTo(ItemWo, { foreignKey: 'id_item_wo', as: 'item_wo' });

module.exports = Lo;
