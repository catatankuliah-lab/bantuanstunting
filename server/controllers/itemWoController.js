const ItemWo = require('../models/itemWoModel');
const Wo = require('../models/woModel');
const Desa = require('../models/desaModel');
const Kecamatan = require('../models/kecamatanModel');
const Kabupaten = require('../models/kabupatenModel');

const addItemWo = async (req, res) => {
    const {
        id_wo,
        id_desa_kelurahan,
        tonase_desa_kelurahan,
        tonase_tersalurkan_wo,
        tonase_sisa_wo,
        qr_item_wo
    } = req.body;

    try {
        const newItemWO = await ItemWo.create({
            id_wo,
            id_desa_kelurahan,
            tonase_desa_kelurahan,
            tonase_tersalurkan_wo,
            tonase_sisa_wo,
            qr_item_wo
        });
        res.status(200).send(newItemWO);
    } catch (error) {
        console.error(req.body);
        res.status(500).send('Server Error');
    }
};

const getAllItemWo = async (req, res) => {
    try {
        const itemwo = await ItemWo.findAll({
            include: [
                {
                    model: Wo,
                    as: 'wo',
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
        res.status(200).send(itemwo);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    addItemWo,
    getAllItemWo,
};
