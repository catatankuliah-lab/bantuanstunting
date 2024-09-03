const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const SPMModel = require("../models/spmModel");

const addSPM = async (req, res) => {
    const {
        nomor_spm,
        tanggal_spm,
        nomor_so,
        nomor_do,
        nomor_mobil,
        nama_driver,
        nomor_driver,
        qr_spm,
        id_gudang
    } = req.body;
    try {
        const newSPMModel = await SPMModel.create({
            nomor_spm,
            tanggal_spm,
            nomor_so,
            nomor_do,
            nomor_mobil,
            nama_driver,
            nomor_driver,
            qr_spm,
            id_gudang
        });
        res.status(200).send(newSPMModel);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};

const getAllSPM = async (req, res) => {
    try {
        const query = `
            SELECT master_data_kpm.*, desa_kelurahan.nama_desa_kelurahan, kecamatan.nama_kecamatan, kabupaten_kota.nama_kabupaten_kota, provinsi.nama_provinsi
            FROM master_data_kpm
            JOIN desa_kelurahan ON master_data_kpm.id_desa_kelurahan = desa_kelurahan.id_desa_kelurahan
            JOIN kecamatan ON desa_kelurahan.id_kecamatan = kecamatan.id_kecamatan
            JOIN kabupaten_kota ON kecamatan.id_kabupaten_kota = kabupaten_kota.id_kabupaten_kota
            JOIN provinsi ON kabupaten_kota.id_provinsi = provinsi.id_provinsi
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

const getDetailSPMByIDSPM = async (req, res) => {
    const { id } = req.params;
    try {
        const query = `
            SELECT spm.*
            FROM spm
            WHERE spm.id_spm = :id
        `;
        const [results] = await sequelize.query(query, {
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
    addSPM,
    getAllSPM,
    getDetailSPMByIDSPM
};
