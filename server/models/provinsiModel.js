const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Provinsi = sequelize.define("provinsi",
  {
    id_provinsi: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    kode_provinsi: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nama_provinsi: {
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
    tableName: "provinsi",
    hooks: {
      beforeCreate: (provinsi) => {
        provinsi.kode_provinsi = provinsi.kode_provinsi.toUpperCase();
        provinsi.nama_provinsi = provinsi.nama_provinsi.toUpperCase();
      },
      beforeUpdate: (provinsi) => {
        provinsi.kode_provinsi = provinsi.kode_provinsi.toUpperCase();
        provinsi.nama_provinsi = provinsi.nama_provinsi.toUpperCase();
      },
    },
  }
);

module.exports = Provinsi;
