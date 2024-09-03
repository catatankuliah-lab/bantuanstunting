const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const Desa = require("./desaModel");

const MasterDataKpm = sequelize.define(
  "masterdatakpm",
  {
    id_master_data_kpm: {
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
    nama_kpm: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    alamat_kpm: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status_master_data_kpm: {
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
    tableName: "master_data_kpm",
    hooks: {
      beforeCreate: (masterdatakpm) => {
        masterdatakpm.nama_kpm = masterdatakpm.nama_kpm.toUpperCase();
        masterdatakpm.status_master_data_kpm =
          masterdatakpm.status_master_data_kpm.toUpperCase();
      },
      beforeUpdate: (masterdatakpm) => {
        masterdatakpm.nama_kpm = masterdatakpm.nama_kpm.toUpperCase();
        masterdatakpm.status_master_data_kpm =
          masterdatakpm.status_master_data_kpm.toUpperCase();
      },
    },
  }
);

MasterDataKpm.belongsTo(Desa, { foreignKey: "id_desa_kelurahan", as: "desa_kelurahan" });
Desa.hasMany(MasterDataKpm, { foreignKey: "id_desa_kelurahan", as: "master_data_kpm_by_desa_kelurahan" });


module.exports = MasterDataKpm;
