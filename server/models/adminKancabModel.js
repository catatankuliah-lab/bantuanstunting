const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./userModel');
const KantorCabang = require('./kantorCabangModel');

const AdminKancab = sequelize.define('admin_kancab', {
    id_admin_kancab: {
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
    tableName: 'admin_kancab',
});

AdminKancab.belongsTo(User, { foreignKey: 'id_user', as: 'user' });
AdminKancab.belongsTo(KantorCabang, { foreignKey: 'id_kantor_cabang', as: 'kantor_cabang' });

module.exports = AdminKancab;
