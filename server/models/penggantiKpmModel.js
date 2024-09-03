const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const Desa = require("./desaModel");
const MasterDataKpm = require("./masterDataKpmModel");
const User = require("./userModel");

const kpmpengganti = sequelize.define(
  "kpmpengganti",
  {
    id_kpm_pengganti: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_desa_kelurahan: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Desa,
        key: "id_desa_kelurahan",
      },
    },
    id_master_data_kpm: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: MasterDataKpm,
        key: "id_master_data_kpm",
      },
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id_user",
      },
    },
    nama_kpm_pengganti: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    alamat_kpm_pengganti: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status_kpm_pengganti: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tanggal_penggantian: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
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
    tableName: "kpm_pengganti",
    hooks: {
      beforeCreate: (kpmpengganti) => {
        kpmpengganti.nama_kpm_pengganti = kpmpengganti.nama_kpm_pengganti.toUpperCase();
        kpmpengganti.status_kpm_pengganti =
          kpmpengganti.status_kpm_pengganti.toUpperCase();
      },
      beforeUpdate: (kpmpengganti) => {
        kpmpengganti.nama_kpm_pengganti = kpmpengganti.nama_kpm_pengganti.toUpperCase();
        kpmpengganti.status_kpm_pengganti =
          kpmpengganti.status_kpm_pengganti.toUpperCase();
      },
    },
  }
);

kpmpengganti.belongsTo(Desa, { foreignKey: "id_desa_kelurahan", as: "desa_kelurahan_kpm_pengganti" });
kpmpengganti.belongsTo(User, { foreignKey: "id_user", as: "kpm_pengganti_by_user" });
Desa.hasMany(kpmpengganti, { foreignKey: "id_desa_kelurahan", as: "kpm_pengganti_by_desa_kelurahan" });

module.exports = kpmpengganti;
