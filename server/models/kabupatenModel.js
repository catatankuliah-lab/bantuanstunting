const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Provinsi = require('./provinsiModel');

const Kabupaten = sequelize.define(
  "kabupaten",
  {
    id_kabupaten_kota: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    kode_kabupaten_kota: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nama_kabupaten_kota: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_provinsi: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Provinsi,
        key: "id_provinsi",
      },
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
    tableName: "kabupaten_kota",
    hooks: {
      beforeCreate: (kabupaten) => {
        kabupaten.kode_kabupaten_kota =
          kabupaten.kode_kabupaten_kota.toUpperCase();
        kabupaten.nama_kabupaten_kota =
          kabupaten.nama_kabupaten_kota.toUpperCase();
      },
      beforeUpdate: (kabupaten) => {
        kabupaten.kode_kabupaten_kota =
          kabupaten.kode_kabupaten_kota.toUpperCase();
        kabupaten.nama_kabupaten_kota =
          kabupaten.nama_kabupaten_kota.toUpperCase();
      },
    },
  }
);

Kabupaten.belongsTo(Provinsi, { foreignKey: 'id_provinsi', as: 'provinsi' });
Provinsi.hasMany(Kabupaten, { foreignKey: 'id_provinsi', as: 'kabupaten_by_provinsi' });

module.exports = Kabupaten;
