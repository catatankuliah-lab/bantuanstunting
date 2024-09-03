const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Lo = require('./loModel');
const Desa = require('./desaModel');

const Sjt = sequelize.define('sjt', {
    id_sjt: {
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
    id_desa_kelurahan: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Desa,
            key: 'id_desa_kelurahan'
        }
    },
    nomor_sjt: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tanggal_sjt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    status_sjt: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tonase_sjt: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    jam_penerimaan: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    qr_sjt: {
        type: DataTypes.DATE,
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
    tableName: 'sjt',
});

Sjt.belongsTo(Desa, { foreignKey: 'id_desa_kelurahan', as: 'desa_kelurahan' });
Sjt.belongsTo(Lo, { foreignKey: 'id_lo', as: 'lo' });

module.exports = Sjt;
