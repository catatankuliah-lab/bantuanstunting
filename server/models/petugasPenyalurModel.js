const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./userModel');
const KantorCabang = require('./kantorCabangModel');

const PetugasPenyalur = sequelize.define('petugas_penyalur', {
    id_petugas_penyalur: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id_user'
        }
    },
    id_kantor_cabang: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: KantorCabang,
            key: 'id_kantor_cabang'
        }
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
    tableName: 'petugas_penyalur',
});

PetugasPenyalur.belongsTo(User, { foreignKey: 'id_user', as: 'user' });
PetugasPenyalur.belongsTo(KantorCabang, { foreignKey: 'id_kantor_cabang', as: 'kantor_cabang' });

module.exports = PetugasPenyalur;
