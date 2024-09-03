const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const DesaKelurahan = require('./desaModel');
const Alokasi = require('./alokasiModel');
const PetugasPenyalur = require('./petugasPenyalurModel');


const DTT = sequelize.define('dtt', {
    id_dtt: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_desa_kelurahan: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: DesaKelurahan,
            key: 'id_desa_kelurahan'
        }
    },
    id_alokasi: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Alokasi,
            key: 'id_alokasi'
        }
    },
    id_petugas_penyalur: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: PetugasPenyalur,
            key: 'id_petugas_penyalur'
        }
    },
    nomor_dtt: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    total_kpm: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    tersalurkan_dtt: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    sisa_dtt: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status_dtt: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    qr_dtt: {
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
    tableName: 'dtt',
});

DTT.belongsTo(DesaKelurahan, { foreignKey: 'id_desa_kelurahan', as: 'desa_kelurahan' });
DTT.belongsTo(Alokasi, { foreignKey: 'id_alokasi', as: 'alokasi' });
DTT.belongsTo(PetugasPenyalur, { foreignKey: 'id_petugas_penyalur', as: 'petugas_penyalur' });

module.exports = DTT;
