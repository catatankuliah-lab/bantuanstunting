const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const MasterDataKpm = require("../models/masterDataKpmModel");

const addMasterDataKpm = async (req, res) => {
    const {
        nama_kpm,
        status_master_data_kpm,
        id_desa_kelurahan,
    } = req.body;
    try {
        const newMasterDataKpm = await MasterDataKpm.create({
            nama_kpm,
            status_master_data_kpm,
            id_desa_kelurahan,
        });
        res.status(200).send(newMasterDataKpm);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};

const getAllDataMasterKpm = async (req, res) => {
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

const getDataMasterKpmbyIDDesa = async (req, res) => {
    const { id } = req.params;
    try {
        const query = `
            SELECT master_data_kpm.*, desa_kelurahan.nama_desa_kelurahan, kecamatan.nama_kecamatan, kabupaten_kota.nama_kabupaten_kota, provinsi.nama_provinsi
            FROM master_data_kpm
            JOIN desa_kelurahan ON master_data_kpm.id_desa_kelurahan = desa_kelurahan.id_desa_kelurahan
            JOIN kecamatan ON desa_kelurahan.id_kecamatan = kecamatan.id_kecamatan
            JOIN kabupaten_kota ON kecamatan.id_kabupaten_kota = kabupaten_kota.id_kabupaten_kota
            JOIN provinsi ON kabupaten_kota.id_provinsi = provinsi.id_provinsi
            WHERE desa_kelurahan.id_desa_kelurahan = :id
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

const getDataMasterKpmbyID = async (req, res) => {
    const { id } = req.params;
    try {
        const query = `
            SELECT master_data_kpm.alamat_kpm, master_data_kpm.id_master_data_kpm
            FROM master_data_kpm
            WHERE master_data_kpm.id_master_data_kpm = :id
        `;
        const [results] = await sequelize.query(query, {
            replacements: { id },
            type: sequelize.QueryTypes.SELECT
        });
        res.status(200).json(results || '');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error : ' + error);
    }
};

const updateStatusKPMDiganti = async (req, res) => {
    const { id } = req.params;
    const query = `
        UPDATE master_data_kpm
        SET status_master_data_kpm = "DIGANTI"
        WHERE id_master_data_kpm = :id
    `;
    const result = await sequelize.query(query, {
        replacements: { id },
        type: sequelize.QueryTypes.UPDATE
    });
    if (result[0] === 0) {
        return res.status(404).json({ message: 'Gagal' });
    }
    res.status(200).json({ message: 'Berhasil' });
};

module.exports = {
    addMasterDataKpm,
    getAllDataMasterKpm,
    getDataMasterKpmbyIDDesa,
    getDataMasterKpmbyID,
    updateStatusKPMDiganti
};
