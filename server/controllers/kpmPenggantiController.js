const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const KPMPengganti = require("../models/penggantiKpmModel");

const addKPMPengganti = async (req, res) => {
    const {
        nama_kpm,
        id_desa_kelurahan,
        id_master_data_kpm,
        id_user,
        nama_kpm_pengganti,
        alamat_kpm_pengganti,
        status_kpm_pengganti,
        tanggal_penggantian
    } = req.body;
    try {
        const newKPMPengganti = await KPMPengganti.create({
            nama_kpm,
            id_desa_kelurahan,
            id_master_data_kpm,
            id_user,
            nama_kpm_pengganti,
            alamat_kpm_pengganti,
            status_kpm_pengganti,
            tanggal_penggantian
        });
        res.status(200).send(newKPMPengganti);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};

const getAllKPMPengganti = async (req, res) => {
    try {
        const query = `
            SELECT kpm_pengganti.id_kpm_pengganti, kpm_pengganti.nama_kpm_pengganti, kpm_pengganti.tanggal_penggantian, user.nama_user AS 'petugas_input', master_data_kpm.*, desa_kelurahan.nama_desa_kelurahan, kecamatan.nama_kecamatan, kabupaten_kota.nama_kabupaten_kota, provinsi.nama_provinsi
            FROM kpm_pengganti
            JOIN master_data_kpm ON kpm_pengganti.id_master_data_kpm = master_data_kpm.id_master_data_kpm
            JOIN desa_kelurahan ON kpm_pengganti.id_desa_kelurahan = desa_kelurahan.id_desa_kelurahan
            JOIN kecamatan ON desa_kelurahan.id_kecamatan = kecamatan.id_kecamatan
            JOIN kabupaten_kota ON kecamatan.id_kabupaten_kota = kabupaten_kota.id_kabupaten_kota
            JOIN provinsi ON kabupaten_kota.id_provinsi = provinsi.id_provinsi
            JOIN user ON kpm_pengganti.id_user = user.id_user
            WHERE kpm_pengganti.status_kpm_pengganti = "AKTIF"
        `;
        const results = await sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT
        });
        res.status(200).json(results || {});
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error : ' + error);
    }
};

const getKPMPengganti = async (req, res) => {
    const { id } = req.params;
    try {
        const query = `
            SELECT kpm_pengganti.id_kpm_pengganti, kpm_pengganti.nama_kpm_pengganti, kpm_pengganti.tanggal_penggantian, user.nama_user AS 'petugas_input', master_data_kpm.*, desa_kelurahan.nama_desa_kelurahan, kecamatan.nama_kecamatan, kabupaten_kota.nama_kabupaten_kota, provinsi.nama_provinsi
            FROM kpm_pengganti
            JOIN master_data_kpm ON kpm_pengganti.id_master_data_kpm = master_data_kpm.id_master_data_kpm
            JOIN desa_kelurahan ON kpm_pengganti.id_desa_kelurahan = desa_kelurahan.id_desa_kelurahan
            JOIN kecamatan ON desa_kelurahan.id_kecamatan = kecamatan.id_kecamatan
            JOIN kabupaten_kota ON kecamatan.id_kabupaten_kota = kabupaten_kota.id_kabupaten_kota
            JOIN provinsi ON kabupaten_kota.id_provinsi = provinsi.id_provinsi
            JOIN user ON kpm_pengganti.id_user = user.id_user
            WHERE kpm_pengganti.status_kpm_pengganti = "AKTIF"
            AND desa_kelurahan.id_desa_kelurahan = :id
        `;
        const results = await sequelize.query(query, {
            replacements: { id },
            type: sequelize.QueryTypes.SELECT
        });
        res.status(200).json(results || {});
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error : ' + error);
    }
};

module.exports = {
    addKPMPengganti,
    getAllKPMPengganti,
    getKPMPengganti
};
