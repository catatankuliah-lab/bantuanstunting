const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const KPMMaster = require('./masterDataKpmModel');
const DTT = require('./dttModel');

const Kpm = sequelize.define('kpm', {
    id_kpm: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_dtt: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: DTT,
            key: 'id_dtt'
        }
    },
    id_master_data_kpm: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: KPMMaster,
            key: 'id_master_data_kpm'
        }
    },
    qr_kpm: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status_kpm: {
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
    tableName: 'kpm_salur',
});

Kpm.belongsTo(KPMMaster, { foreignKey: 'id_master_data_kpm', as: 'master_data_kpm' });
Kpm.belongsTo(DTT, { foreignKey: 'id_dtt', as: 'dtt' });
DTT.hasMany(Kpm, { foreignKey: 'id_dtt', as: 'kpm' });

module.exports = Kpm;
