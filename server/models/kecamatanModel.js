const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const Kabupaten = require("./kabupatenModel");

const Kecamatan = sequelize.define(
  "kecamatan",
  {
    id_kecamatan: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_kabupaten_kota: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Kabupaten,
        key: "id_kabupaten_kota",
      },
    },
    kode_kecamatan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nama_kecamatan: {
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
    tableName: "kecamatan",
    hooks: {
      beforeCreate: (kecamatan) => {
        kecamatan.kode_kecamatan = kecamatan.kode_kecamatan.toUpperCase();
        kecamatan.nama_kecamatan = kecamatan.nama_kecamatan.toUpperCase();
      },
      beforeUpdate: (kecamatan) => {
        kecamatan.kode_kecamatan = kecamatan.kode_kecamatan.toUpperCase();
        kecamatan.nama_kecamatan = kecamatan.nama_kecamatan.toUpperCase();
      },
    },
  }
);

Kecamatan.belongsTo(Kabupaten, { foreignKey: 'id_kabupaten_kota', as: 'kabupaten_kota' });
Kabupaten.hasMany(Kecamatan, { foreignKey: 'id_kabupaten_kota', as: 'kecamatan_by_kabupaten' })


module.exports = Kecamatan;
