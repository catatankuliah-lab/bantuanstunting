const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Desa = require('./desaModel');
const Wo = require('./woModel');

const ItemWo = sequelize.define('itemwo', {
    id_item_wo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_wo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Wo,
            key: 'id_wo'
        }
    },
    id_desa_kelurahan: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Desa,
            key: 'id_desa_kelurahan'
        }
    },
    tonase_desa_kelurahan: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    tonase_tersalurkan_wo: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    tonase_sisa_wo: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    qr_item_wo: {
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
    tableName: 'item_wo',
});

ItemWo.belongsTo(Desa, { foreignKey: 'id_desa_kelurahan', as: 'desa_kelurahan' });
ItemWo.belongsTo(Wo, { foreignKey: 'id_wo', as: 'wo' });
Wo.hasMany(ItemWo, { foreignKey: 'id_wo', as: 'item_wo' });

module.exports = ItemWo;
