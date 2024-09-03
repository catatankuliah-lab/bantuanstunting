const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const DTT = require('../models/dttModel');

const getDTTbyIdDesa = async (req, res) => {
    const { id } = req.params;
    try {
        const query = `
            SELECT
                JSON_OBJECT(
                    'id_dtt', dtt.id_dtt,
                    'qr_dtt', dtt.qr_dtt,
                    'penerima', (
                        SELECT JSON_ARRAYAGG(
                            JSON_OBJECT(
                                'id_master_data_kpm', kpm_salur.id_master_data_kpm,
                                'qr_kpm', kpm_salur.qr_kpm,
                                'nama_kpm', master_data_kpm.nama_kpm,
                                'alamat_kpm', master_data_kpm.alamat_kpm,
                                'nama_desa_kelurahan', desa_kelurahan.nama_desa_kelurahan,
                                'nama_kecamatan', kecamatan.nama_kecamatan,
                                'nama_kabupaten_kota', kabupaten_kota.nama_kabupaten_kota,
                                'nama_provinsi', provinsi.nama_provinsi
                            )
                        )
                        FROM kpm_salur
                        JOIN master_data_kpm ON kpm_salur.id_master_data_kpm = master_data_kpm.id_master_data_kpm
                                    JOIN desa_kelurahan ON master_data_kpm.id_desa_kelurahan = desa_kelurahan.id_desa_kelurahan
                                    JOIN kecamatan ON desa_kelurahan.id_kecamatan = kecamatan.id_kecamatan
                                    JOIN kabupaten_kota ON kecamatan.id_kabupaten_kota = kabupaten_kota.id_kabupaten_kota
                                    JOIN provinsi ON kabupaten_kota.id_provinsi = provinsi.id_provinsi
                        WHERE kpm_salur.id_dtt = dtt.id_dtt
                    )
                ) AS result
            FROM dtt
            WHERE dtt.id_desa_kelurahan = :id
            LIMIT 1;
        `;
        const [results] = await sequelize.query(query, {
            replacements: { id },
            type: sequelize.QueryTypes.SELECT
        });
        res.status(200).json(results || null);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error : ' + error);
    }
};

module.exports = {
    getDTTbyIdDesa
};
