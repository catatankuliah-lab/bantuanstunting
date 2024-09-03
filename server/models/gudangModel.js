const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const KantorCabang = require('./kantorCabangModel');

const Gudang = sequelize.define(
  "gudang",
  {
    id_gudang: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_kantor_cabang: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: KantorCabang,
        key: "id_kantor_cabang",
      },
    },
    nama_gudang: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    alamat_gudang: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
    tableName: "gudang",
    hooks: {
      beforeCreate: (gudang) => {
        gudang.nama_gudang = gudang.nama_gudang.toUpperCase();
      },
      beforeUpdate: (gudang) => {
        gudang.nama_gudang = gudang.nama_gudang.toUpperCase();
      },
    },
  }
);

Gudang.belongsTo(KantorCabang, { foreignKey: 'id_kantor_cabang', as: 'kantor_cabang' });

module.exports = Gudang;
