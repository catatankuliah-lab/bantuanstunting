const Sjt = require('../models/sjtModel');
const Lo = require('../models/loModel');
const ItemWo = require('../models/itemWoModel');
const Wo = require('../models/woModel');
const Desa = require('../models/desaModel');
const Kecamatan = require('../models/kecamatanModel');
const Kabupaten = require('../models/kabupatenModel');

const addSjt = async (req, res) => {
    const {
        id_desa_kelurahan,
        id_lo,
        nomor_sjt,
        tanggal_sjt,
        status_sjt,
        tonase_sjt,
        jam_penerimaan,
        qr_sjt
    } = req.body;

    try {
        const newSjt = await Sjt.create({
            id_desa_kelurahan,
            id_lo,
            nomor_sjt,
            tanggal_sjt,
            status_sjt,
            tonase_sjt,
            jam_penerimaan,
            qr_sjt
        });
        res.status(200).send(newSjt);
    } catch (error) {
        console.error(req.body);
        res.status(500).send('Server Error');
    }
};

const getAllSjt = async (req, res) => {
    try {
        const sjt = await Sjt.findAll({
            include: [
                {
                    model: Lo,
                    as: 'lo',
                    include: {
                        model: ItemWo,
                        as: 'item_wo',
                        include: {
                            model: Wo,
                            as: 'wo',
                        },
                    },
                },
                {
                    model: Desa,
                    as: 'desa_kelurahan',
                    include: {
                        model: Kecamatan,
                        as: 'kecamatan',
                        include: {
                            model: Kabupaten,
                            as: 'kabupaten_kota',
                        },
                    },
                }]
        });
        res.status(200).send(sjt);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    addSjt,
    getAllSjt,
};
