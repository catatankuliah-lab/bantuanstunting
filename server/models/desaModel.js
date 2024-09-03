const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const Kecamatan = require("./kecamatanModel");

const Desa = sequelize.define(
  "desa_kelurahan",
  {
    id_desa_kelurahan: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_kecamatan: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Kecamatan,
        key: "id_kecamatan",
      },
    },
    kode_desa_kelurahan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nama_desa_kelurahan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jumlah_alokasi_desa: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    jumlah_alokasi_desa_tersalurkan: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    jumlah_alokasi_desa_sisa: {
      type: DataTypes.INTEGER,
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
    tableName: "desa_kelurahan",
    hooks: {
      beforeCreate: (desa_kelurahan) => {
        desa_kelurahan.kode_desa_kelurahan = desa_kelurahan.kode_desa_kelurahan.toUpperCase();
        desa_kelurahan.nama_desa_kelurahan = desa_kelurahan.nama_desa_kelurahan.toUpperCase();
      },
      beforeUpdate: (desa_kelurahan) => {
        desa_kelurahan.kode_desa_kelurahan = desa_kelurahan.kode_desa_kelurahan.toUpperCase();
        desa_kelurahan.nama_desa_kelurahan = desa_kelurahan.nama_desa_kelurahan.toUpperCase();
      },
    },
  }
);

Desa.belongsTo(Kecamatan, { foreignKey: 'id_kecamatan', as: 'kecamatan' });
Kecamatan.hasMany(Desa, { foreignKey: 'id_kecamatan', as: 'desa_kelurahan_by_kecamatan' });

module.exports = Desa;