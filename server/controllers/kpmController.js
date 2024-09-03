const Kpm = require('../models/kpmModel');
const KPMMaster = require('../models/masterDataKpmModel');
const Desa = require('../models/desaModel');
const Kecamatan = require('../models/kecamatanModel');
const Kabupaten = require('../models/kabupatenModel');
const Provinsi = require('../models/provinsiModel');

const addKPM = async (req, res) => {
    const {
        id_dtt,
        id_master_data_kpm,
        qr_kpm,
        status_kpm
    } = req.body;

    try {
        const newKPM = await Kpm.create({
            id_dtt,
            id_master_data_kpm,
            qr_kpm,
            status_kpm
        });
        res.status(200).send(newKPM);
    } catch (error) {
        console.error(req.body);
        res.status(500).send('Server Error');
    }
};

const getAllKPM = async (req, res) => {
    try {
        const kpm = await Kpm.findAll({
            include: [
                {
                    model: KPMMaster,
                    as: 'master_data_kpm',
                    include: {
                        model: Desa,
                        as: 'desa_kelurahan',
                        include: {
                            model: Kecamatan,
                            as: 'kecamatan',
                            include: {
                                model: Kabupaten,
                                as: 'kabupaten_kota',
                                include: {
                                    model: Provinsi,
                                    as: 'provinsi',
                                },
                            },
                        },
                    }
                }
            ]
        });
        res.status(200).send(kpm);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    addKPM,
    getAllKPM
};
